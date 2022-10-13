import { Auth } from "aws-amplify";
import Axios, { Method, AxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

console.log({ baseUrl });

const API = {
  get: async <T>({ path }: { path: string }) => API.request<T>({ path }),
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

    console.log({ user });

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

    console.log({ requestConfig });

    const axiosRes = await Axios.request<T>(requestConfig);
    console.log({ axiosRes });
    const res = axiosRes.data;
    console.log("HERE!!!");
    console.log({ res });
    return res as T;
  },
};
export default API;
