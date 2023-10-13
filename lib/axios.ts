import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { deleteAllCookies, getCookie } from "../utils/cookie";

const authRequestInterceptor = (config: AxiosRequestConfig) => {
//   const token = getCookie("userToken");

  let headers: any = {};
//   if (token != null) {
//     headers.authorization = `Token ${token}`;
//   }

  return { ...config, headers };
};

const onFulfilled = (response: AxiosResponse<any, any>) => {
  return response;
};

const onRejected = async (error: any) => {
//   const token = getCookie("userToken");
//   if (token && error?.response?.status === 401) {
//     deleteAllCookies();
//     if (window) {
//       window.location.href = `/`;
//     }
//   }
//   if (error?.response?.status === 401) {
//     deleteAllCookies();
//     if (window) {
//       window.location.href = `/`;
//     }
//   } else {
//     throw error;
//   }
//   const errorConfig = error.config;
};

const frontendServiceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

frontendServiceApi.interceptors.request.use(authRequestInterceptor);

frontendServiceApi.interceptors.response.use(onFulfilled, onRejected);

export const api = frontendServiceApi;
