import { apiConnector } from "./apiConnector";

export const authEndpoints = {
  SENDOTP_API: "/api/v1/auth/send-otp",
  SIGNUP_API: "/api/v1/auth/signup",
  LOGIN_API: "/api/v1/auth/login",
  LOGOUT_API: "/api/v1/auth/logout",
};

export const sendOtpAPI = async (email) => {
  return await apiConnector("POST", authEndpoints.SENDOTP_API, { email });
};

export const signupAPI = async (formData) => {
  return await apiConnector("POST", authEndpoints.SIGNUP_API, formData);
};

export const loginAPI = async (formData) => {
  return await apiConnector("POST", authEndpoints.LOGIN_API, formData);
};

export const logoutAPI = async (token) => {
  return await apiConnector("POST", authEndpoints.LOGOUT_API, {}, { Authorization: `Bearer ${token}` });
};
