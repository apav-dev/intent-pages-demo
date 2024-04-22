import { YextResponse } from "../types/yext";

export const createEntity = async <T>(
  entityType: string,
  requestBody: T
): Promise<string | undefined> => {
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

  if (mgmtApiResp.status !== 201) {
    console.error("Error creating entity:", JSON.stringify(resp));
    return;
  } else {
    const resp = await mgmtApiResp.json();
    console.log("Entity created:", resp);
    return resp.response.meta.id;
  }
};

export const updateEntity = async (
  entityId: string,
  body: any
): Promise<string | undefined> => {
  const mgmtApiResp = await fetch(
    `https://api.yextapis.com/v2/accounts/me/entities/${entityId}?api_key=${YEXT_MGMT_API_KEY}&v=20230901`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const resp = await mgmtApiResp.json();

  if (mgmtApiResp.status !== 200) {
    console.error("Error updating entity:", resp);
    return;
  } else {
    return entityId;
  }
};

export const deleteEntity = async (
  entityId: string
): Promise<string | undefined> => {
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
    return;
  } else {
    return entityId;
  }
};

export const fetchEntity = async <T>(
  entityId: string
): Promise<YextResponse<T> | undefined> => {
  const url = `https://api.yextapis.com/v2/accounts/me/entities/${entityId}?api_key=${YEXT_MGMT_API_KEY}&v=20230901`;
  console.log("Fetching entity:", url);
  const apiResponse = await fetch(url);

  if (apiResponse.status === 404) {
    return;
  } else if (apiResponse.status === 200) {
    const response = await apiResponse.json();
    return response;
  } else {
    console.error("Error fetching entity:", apiResponse);
    return;
  }
};

export const fetchEntities = async <T>(
  entityType: string,
  filter: string
): Promise<YextResponse<{ entities: T[] }>> => {
  let url = `https://api.yextapis.com/v2/accounts/me/entities?api_key=${YEXT_MGMT_API_KEY}&v=20230901&entityType=${entityType}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  const apiResponse = await fetch(url);
  const response = await apiResponse.json();
  return response;
};
