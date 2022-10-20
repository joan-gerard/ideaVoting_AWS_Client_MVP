import { Auth } from "aws-amplify";
import Axios, { Method, AxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const API = {
  get: async <T>({ path }: { path: string }) => API.request<T>({ path }),
  delete: async <T>({ path }: { path: string }) => API.request<T>({ path, method: "DELETE" }),
  post: ({ path, data }: { path: string; data: Record<string, any> }) => {
    return API.request({ path, data, method: "POST" });
  },

  request: async <T = any>({
    path,
    method = "GET",
    data,
  }: {
    path: string;
    data?: Record<string, any>;
    method?: Method;
  }) => {
    const user = await Auth.currentSession();

    const headers =
      method === "GET"
        ? {}
        : { Authorization: `Bearer ${user.getIdToken().getJwtToken()}` };

    const requestConfig: AxiosRequestConfig = {
      headers,
      method,
      url: `${baseUrl}${path}`,
      data,
    };

    const axiosRes = await Axios.request<T>(requestConfig);
    const res = axiosRes.data;
    return res as T;
  },
};
export default API;
