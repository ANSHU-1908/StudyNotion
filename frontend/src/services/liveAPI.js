import { apiConnector } from "./apiConnector";

export const liveEndpoints = {
  SCHEDULE_LIVE_API: "/api/v1/live/schedule",
  GET_LIVE_CLASSES_API: "/api/v1/live",
};

export const scheduleLiveAPI = async (data, token) => {
  return await apiConnector("POST", liveEndpoints.SCHEDULE_LIVE_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

export const getLiveClassesAPI = async (courseId, token) => {
  return await apiConnector("GET", `${liveEndpoints.GET_LIVE_CLASSES_API}/${courseId}`, null, {
    Authorization: `Bearer ${token}`,
  });
};
