import { apiConnector } from "./apiConnector";

export const paymentEndpoints = {
  CREATE_ORDER_API: "/api/v1/payment/create-order",
  VERIFY_PAYMENT_API: "/api/v1/payment/verify",
};

export const createOrderAPI = async (data, token) => {
  return await apiConnector("POST", paymentEndpoints.CREATE_ORDER_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

export const verifyPaymentAPI = async (data, token) => {
  return await apiConnector("POST", paymentEndpoints.VERIFY_PAYMENT_API, data, {
    Authorization: `Bearer ${token}`,
  });
};
