import { apiConnector } from "./apiConnector";

export const courseEndpoints = {
  COURSE_DETAILS_API: "/api/v1/course",
  GET_ALL_COURSE_API: "/api/v1/course/all",
  CREATE_COURSE_API: "/api/v1/course/create",
  CREATE_SECTION_API: "/api/v1/course/section",
  CREATE_SUBSECTION_API: "/api/v1/course/subsection",
  TOGGLE_STATUS_API: "/api/v1/course/toggle-status",
  GET_INSTRUCTOR_COURSES_API: "/api/v1/course/instructor/my-courses",
};

export const getAllCoursesAPI = async () => {
  return await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API);
};

export const getCourseDetailsAPI = async (courseId) => {
  return await apiConnector("GET", `${courseEndpoints.COURSE_DETAILS_API}/${courseId}`);
};

export const createCourseAPI = async (data, token) => {
  return await apiConnector("POST", courseEndpoints.CREATE_COURSE_API, data, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
};

export const createSectionAPI = async (data, token) => {
  return await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

export const createSubSectionAPI = async (data, token) => {
  return await apiConnector("POST", courseEndpoints.CREATE_SUBSECTION_API, data, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
};

export const getInstructorCoursesAPI = async (token) => {
  return await apiConnector("GET", courseEndpoints.GET_INSTRUCTOR_COURSES_API, null, {
    Authorization: `Bearer ${token}`,
  });
};

export const toggleCourseStatusAPI = async (courseId, token) => {
  return await apiConnector("PUT", `${courseEndpoints.TOGGLE_STATUS_API}/${courseId}`, null, {
    Authorization: `Bearer ${token}`,
  });
};
