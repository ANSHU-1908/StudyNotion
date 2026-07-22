import { apiConnector } from "./apiConnector";

export const profileEndpoints = {
  GET_USER_DETAILS_API: "/api/v1/profile",
  GET_USER_ENROLLED_COURSES_API: "/api/v1/profile/enrolled-courses",
  UPDATE_PROFILE_API: "/api/v1/profile/update",
};

export const getUserDetailsAPI = async (token) => {
  return await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API, null, {
    Authorization: `Bearer ${token}`,
  });
};

export const getUserEnrolledCoursesAPI = async (token) => {
  return await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API, null, {
    Authorization: `Bearer ${token}`,
  });
};

export const updateProfileAPI = async (formData, token) => {
  return await apiConnector("PUT", profileEndpoints.UPDATE_PROFILE_API, formData, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
};
