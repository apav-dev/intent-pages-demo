import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import {
  CreateCategoryPageRequest,
  LocationProfile,
  WebhookPayload,
} from "../../../types/yext";
import {
  createCategoryPageEntity,
  fetchEntities,
  fetchEntity,
} from "../../../utils/api";

export default async function entity(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { method, body } = request;

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

  checkIfEntityExistsResults.forEach((result) => {
    if (result.status === "fulfilled") {
      const value = result.value as {
        entityExists: boolean;
        entityId: string;
      };

      if (!value.entityExists) {
        const requestBody = constructCategoryPageEntity(
          locationEntityId,
          value.entityId,
          locationProfile
        );
        createCategoryPageRequests.push(requestBody);
      }
    } else {
      // Log or handle the error.
      console.log("Error accessing entity:", result.reason);
    }
  });

  const createEntityPromises = createCategoryPageRequests.map((request) =>
    createCategoryPageEntity<CreateCategoryPageRequest>(
      "ce_categoryPage",
      request
    )
  );

  const createCategoryPageRequestsResults =
    await Promise.allSettled(createEntityPromises);

  createCategoryPageRequestsResults.forEach((result) => {
    if (result.status === "fulfilled") {
      const value = result.value as PagesHttpResponse;
      console.log("Entity created:", value);
    } else {
      console.log("Error creating entity:", result.reason);
    }
  });

  // Remove Category Pages that are no longer linked to the location
  const test = await getEntitiesThatShouldBeDeleted(
    locationEntityId,
    locationProfile
  );
  console.log(test);

  // TODO: replace with actual logic
  return { body: "POST request received", headers: {}, statusCode: 200 };
}

const checkIfEntityExists = async (
  entityId: string
): Promise<{ entityExists: boolean; entityId: string }> => {
  const response = await fetchEntity(entityId);

  const entityExists = response.status !== 404;
  console.log(
    entityExists ? "Entity exists: " : "Entity doesn't exist: ",
    entityId
  );

  return {
    entityExists,
    entityId,
  };
};

const getEntitiesThatShouldBeDeleted = async (
  locationEntityId: string,
  locationProfile: LocationProfile
): Promise<string[]> => {
  const filter = constructEqualsFilter("c_relatedLocations", locationEntityId);
  console.log("Filter:", filter);
  const apiResp = await fetchEntities(
    "ce_categoryPage",
    JSON.stringify(filter)
  );
  const resp = await apiResp.json();
  const categoryPageEntitiesForLocation = resp.response.entities;
  return categoryPageEntitiesForLocation.map((entity) => entity.meta.id);

  // // Assuming `categoryPageEntitiesForLocation` is an array of entities with an `id` field.
  // // Filter out entities whose ids are not present in `locationProfile.c_relatedCategories`.
  // const entitiesToBeDeleted = categoryPageEntitiesForLocation
  //   .filter((entity) => {
  //     // Assuming each entity has a category id as the last segment of its id, following a '-'
  //     const categoryId = entity.id.split("-").pop();
  //     // Check if this category id is not in the locationProfile's related categories
  //     return !locationProfile.c_relatedCategories.includes(categoryId);
  //   })
  //   .map((entity) => entity.id); // Extract the ids of the entities to be deleted

  // return entitiesToBeDeleted;
};

const constructCategoryPageEntity = (
  locationEntityId: string,
  categoryPageEntityId: string,
  locationData: any
): CreateCategoryPageRequest => {
  const id = categoryPageEntityId;
  const categoryId = categoryPageEntityId.split("-")[1];

  // TODO: logic to get the name
  // const name = locationData.name + " " + categoryEntityId;

  const slug = locationData.slug + "/" + categoryId;

  return {
    meta: {
      id,
    },
    name: "Category Page", // TODO: update with actual name
    slug,
    c_relatedCategories: [categoryId],
    c_relatedLocations: [locationEntityId],
    // TODO: photo
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
