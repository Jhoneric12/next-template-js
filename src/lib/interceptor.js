import { message } from "antd";
import axios from "axios";
import { useClientAuthStore } from "@/store/useAppStore";

export const axiosAuth = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

export const getUsersValues = {
  client: "CLIENT",
};

export const getUserToken = (user = getUsersValues.user) => {
  if (user === getUsersValues.client) {
    return useClientAuthStore.getState();
  }
};

export const createAxiosInstanceWithInterceptor = ({ type = "application", user, baseURL = null }) => {
  const headers = {
    // "Access-Control-Allow-Origin": "*",
  };

  if (type === "application") {
    headers["Content-Type"] = "application/json";
  } else {
    headers["content-type"] = "multipart/form-data";
  }

  const instance = axios.create({
    baseURL: baseURL || import.meta.env.VITE_BASE_URL,
    headers,
  });

  instance.interceptors.request.use(async (config) => {
    try {
      const { token } = getUserToken(user);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error("Authorization token not found.");
      }
    } catch (error) {
      console.error({ error });
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      const { reset } = getUserToken(user);
      const errMessage = error.response?.data;
      if (errMessage?.message === "Invalid token." || errMessage?.code == 300) {
        message.warning("Unable to process transaction. You have to login again.");
        reset();
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return instance;
};
