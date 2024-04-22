import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import {
  Category,
  CreateCategoryPageRequest,
  LocationProfile,
  WebhookPayload,
  Location,
} from "../../../types/yext";
import {
  createEntity,
  updateEntity,
  deleteEntity,
  fetchEntities,
  fetchEntity,
} from "../../../lib/api";

export default async function entity(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { method, body } = request;

  console.log("Request received at:", new Date().toISOString());

  if (request.method !== "POST") {
    console.error("Method not allowed: ", method);
    return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }

  if (!body) {
    return { body: "Missing request body", headers: {}, statusCode: 400 };
  }

  const requestBody: WebhookPayload = JSON.parse(body);

  if (requestBody.meta.eventType !== "ENTITY_UPDATED") {
    return buildNoActionResponse("Unsupported event type");
  }

  if (requestBody.primaryProfile.meta.entityType !== "location") {
    return buildNoActionResponse("Entity type not supported");
  }

  if (!requestBody.changedFields.fieldNames.includes("c_relatedCategories")) {
    return buildNoActionResponse("Linked categories not changed");
  }

  const locationEntityId = requestBody.entityId;
  const locationProfile = requestBody.primaryProfile as LocationProfile;
  const categoryPageEntityIds = locationProfile.c_relatedCategories
    ? locationProfile.c_relatedCategories?.map(
        (fieldName) => locationEntityId + "-" + fieldName
      )
    : [];

  const entityPromises = categoryPageEntityIds.map((fieldName) =>
    checkIfEntityExists(fieldName)
  );

  const checkIfEntityExistsResults = await Promise.allSettled(entityPromises);
  const createCategoryPageRequests: CreateCategoryPageRequest[] = [];

  // await Promise.allSettled(
  //   checkIfEntityExistsResults.map(async (result) => {
  //     if (result.status === "fulfilled") {
  //       const value = result.value as {
  //         entityExists: boolean;
  //         entityId: string;
  //       };

  //       if (!value.entityExists) {
  //         console.log(
  //           "Entity doesn't exist:",
  //           value.entityId,
  //           value.entityExists
  //         );

  //         const requestBody = await constructCategoryPageEntity(
  //           locationEntityId,
  //           value.entityId,
  //           locationProfile
  //         );
  //         console.log("Request body:", requestBody);
  //         createCategoryPageRequests.push(requestBody);
  //       }
  //     } else {
  //       // Log or handle the error.
  //       console.log("Error accessing entity:", result.reason);
  //     }
  //   })
  // );

  // TODO: clean up typescript
  await Promise.allSettled(
    checkIfEntityExistsResults.map(async (result) => {
      if (result.status === "fulfilled") {
        let { entityExists, entityId, entity } = result.value;

        if (!entityExists) {
          console.log("Entity doesn't exist:", entityId, entityExists);
          const requestBody = await constructCategoryPageEntity(
            locationEntityId,
            entityId,
            locationProfile
          );
          console.log("Request body:", requestBody);
          createCategoryPageRequests.push(requestBody);
        } else {
          // Check if locationEntityId is already in c_relatedLocations
          if (
            entity &&
            (!entity.c_relatedLocations ||
              !entity.c_relatedLocations.includes(locationEntityId))
          ) {
            entity = {
              ...entity,
              c_relatedLocations: [
                ...(entity.c_relatedLocations ?? []),
                locationEntityId,
              ],
            };
            await updateEntity(entityId, {
              c_relatedLocations: entity.c_relatedLocations,
            });
          }
        }
      } else {
        // Log or handle the error.
        console.log("Error accessing entity:", result.reason);
      }
    })
  );

  console.log("Create requests:", createCategoryPageRequests);
  const createEntityPromises = createCategoryPageRequests.map((request) =>
    createEntity<CreateCategoryPageRequest>("ce_categoryPage", request)
  );

  const createCategoryPageRequestsResults =
    await Promise.allSettled(createEntityPromises);

  const createdEntities: string[] = [];
  createCategoryPageRequestsResults.forEach((result) => {
    console.log("Result:", result);
    if (result.status === "fulfilled") {
      const value = result.value;
      if (value) {
        console.log("Entity created:", value);
        createdEntities.push(value);
      }
    } else {
      console.log("Error creating entity:", result.reason);
    }
  });

  // Remove Category Pages that are no longer linked to the location
  const entityIdsToUnlink = await getEntitiesThatShouldBeUnlinked(
    locationEntityId,
    categoryPageEntityIds
  );
  console.log("Entities to unlink:", entityIdsToUnlink);

  const unlinkBody = {
    c_relatedLocations: [],
  };

  const unlinkEntityPromises = entityIdsToUnlink.map((entityId) =>
    updateEntity(entityId, unlinkBody)
  );

  const unlinkedEntityResults = await Promise.allSettled(unlinkEntityPromises);

  const unlinkedEntities: string[] = [];
  unlinkedEntityResults.forEach((result) => {
    if (result.status === "fulfilled") {
      const value = result.value;
      if (value) {
        console.log("Entity unlinked:", value);
        unlinkedEntities.push(value);
      }
    } else {
      console.log("Error unlinking entity:", result.reason);
    }
  });

  return {
    body: JSON.stringify({
      message: "Request processed successfully",
      createdEntities,
      unlinkedEntities,
    }),
    headers: {},
    statusCode: 200,
  };
}

const checkIfEntityExists = async (
  entityId: string
): Promise<{ entityExists: boolean; entityId: string; entity?: any }> => {
  const response = await fetchEntity(entityId);
  const entityExists = !!response;

  console.log(
    entityExists ? "Entity exists: " : "Entity doesn't exist: ",
    entityId
  );
  return {
    entityExists,
    entityId,
    entity: response,
  };
};

const getEntitiesThatShouldBeUnlinked = async (
  locationEntityId: string,
  categoryPageIds: string[]
): Promise<string[]> => {
  const filter = constructEqualsFilter("c_relatedLocations", locationEntityId);
  const { response } = await fetchEntities<Location>(
    "ce_categoryPage",
    JSON.stringify(filter)
  );
  const categoryPageEntitiesForLocation = response.entities;
  const currentCategoryPageIds = categoryPageEntitiesForLocation.map(
    (entity) => entity.meta.id
  );

  return currentCategoryPageIds.filter((id) => !categoryPageIds.includes(id));
};

const constructCategoryPageEntity = async (
  locationEntityId: string,
  categoryPageEntityId: string,
  locationData: any
): Promise<CreateCategoryPageRequest> => {
  const id = categoryPageEntityId;
  const categoryId = categoryPageEntityId.split("-")[1];
  const slug = locationData.slug + "/" + categoryId;

  const entityResponse = await fetchEntity<Category>(locationEntityId);

  return {
    meta: {
      id,
    },
    name: `${locationEntityId}-${categoryId} Category Page`,
    slug,
    c_relatedCategories: [categoryId],
    c_relatedLocations: [locationEntityId],
    primaryPhoto: entityResponse?.response.primaryPhoto,
    photoGallery: entityResponse?.response.photoGallery ?? [],
    products: entityResponse?.response.products ?? [],
    services: entityResponse?.response.services ?? [],
  };
};

const buildNoActionResponse = (reason: string): PagesHttpResponse => {
  console.log("No action taken:", reason);
  const response: PagesHttpResponse = {
    body: JSON.stringify({
      message: "Request processed successfully, but no changes were made.",
      reason: reason,
      actionTaken: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };

  return response;
};

type EqualsFilter = {
  [key: string]: {
    $eq: string;
  };
};

const constructEqualsFilter = (
  filterKey: string,
  eqValue: string
): EqualsFilter => {
  return {
    [filterKey]: {
      $eq: eqValue,
    },
  };
};
