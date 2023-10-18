import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { LocalStorageSession } from "../sessions";
import { UserSecurityResponse } from "@/auth/login/domain";

const AxiosInterceptor = (): void => {
  axios.interceptors.request.use(
    // @ts-expect-error
    (config: AxiosRequestConfig) => {
      config.headers = {
        ...config.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const isValidAuth: boolean = LocalStorageSession.isValidAuthorization();

      if (isValidAuth) {
        const user: UserSecurityResponse =
          LocalStorageSession.getAuthorization();
        const security = user.security;
        config.headers.Authorization = `${security.tokenType} ${security.accessToken}`;
      }

      return config;
    },
    async (error) => await Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => await Promise.reject(error),
  );
};

export default AxiosInterceptor;
