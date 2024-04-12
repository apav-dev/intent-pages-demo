import { MAPS_API_KEY } from "../config";

const isLocalDev = import.meta.env.DEV;

export const getMapKey = () => {
  if (MAPS_API_KEY === "<REPLACE-ME>") {
    console.error(
      "Add a map provider API key to config.ts or as a site variable to enable map functionality on staging or prod."
    );
  }

  const authObj = { apiKey: MAPS_API_KEY };

  return authObj;
};
