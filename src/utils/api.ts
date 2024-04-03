import { PagesHttpResponse } from "@yext/pages/*";

export const createCategoryPageEntity = async <T>(
  entityType: string,
  requestBody: T
): Promise<PagesHttpResponse> => {
  console.log("Creating entity:", requestBody);
  const mgmtApiResp = await fetch(
    `https://api.yextapis.com/v2/accounts/me/entities?api_key=${YEXT_MGMT_API_KEY}&v=20230901&entityType=${entityType}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const resp = await mgmtApiResp.json();

  if (mgmtApiResp.status !== 200) {
    console.error("Error creating entity:", resp);
    return {
      body: JSON.stringify(resp),
      headers: {},
      statusCode: mgmtApiResp.status,
    };
  } else {
    console.log("Entity created:", resp);
    return {
      body: JSON.stringify(resp),
      headers: {},
      statusCode: 200,
    };
  }
};

export const deleteEntity = async (
  entityId: string
): Promise<PagesHttpResponse> => {
  const mgmtApiResp = await fetch(
    `https://api.yextapis.com/v2/accounts/me/entities/${entityId}?api_key=${YEXT_MGMT_API_KEY}&v=20230901`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const resp = await mgmtApiResp.json();

  if (mgmtApiResp.status !== 200) {
    console.error("Error deleting entity:", resp);
    return {
      body: JSON.stringify(resp),
      headers: {},
      statusCode: mgmtApiResp.status,
    };
  } else {
    console.log("Entity deleted:", resp);
    return {
      body: JSON.stringify(resp),
      headers: {},
      statusCode: 200,
    };
  }
};

export const fetchEntity = (entityId: string): Promise<Response> => {
  const url = `https://api.yextapis.com/v2/accounts/me/entities/${entityId}?api_key=${YEXT_MGMT_API_KEY}&v=20230901`;
  return fetch(url);
};

export const fetchEntities = (
  entityType: string,
  filter: string
): Promise<Response> => {
  let url = `https://api.yextapis.com/v2/accounts/me/entities?api_key=${YEXT_MGMT_API_KEY}&v=20230901&entityType=${entityType}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  console.log("Fetching entities:", url);
  return fetch(url);
};
