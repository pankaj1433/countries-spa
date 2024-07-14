/**
 * Usually it is a good practice to create a common wrapper in our applications
 * for any third party integration. It makes it easier to migrate to better solutions in future,
 * as our app will interact with these wrappers only and we do not need to change app wide logic.
 *
 * Reasons to change such warppers could be: security vulnerability, new enhanced solutions etc.
 */

import axios, {
  Axios,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const API_VERSION = "v3.1";
const BASE_URL = `https://restcountries.com/${API_VERSION}`;

const API_CONFIG: AxiosRequestConfig = {
  baseURL: BASE_URL,
  responseType: "json",
};

const DEFAULT_VALUE_FOR_ERROR_RESPONSE = {
  data: { message: "" },
  status: 0,
};

export class APIService {
  axiosClient: Axios;
  static instance: APIService;

  constructor() {
    this.axiosClient = axios.create(API_CONFIG);
    this.configureInterceptors();
  }

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new APIService();
    }
    return this.instance;
  };

  errorHandler = async (error: AxiosError) => {
    const { response } = error;
    const { data, status } = response || DEFAULT_VALUE_FOR_ERROR_RESPONSE;
    const message = data;
    return {
      data: [],
      status,
      statusText: message,
      type: "error",
    };
  };

  successHandler = (response: AxiosResponse) => {
    const { status, statusText, headers, config } = response;
    return {
      data: response.data,
      status,
      statusText,
      headers,
      config,
      type: "success",
    };
  };

  configureInterceptors = () => {
    this.axiosClient.interceptors.response.use(
      (response: AxiosResponse) => this.successHandler(response),
      (error: AxiosError) => this.errorHandler(error),
    );
    this.axiosClient.interceptors.request.use((request) => request);
  };

  get = async (url: string) => {
    const res = await this.axiosClient
      .get(url)
      .then((response: AxiosResponse) => response);
    return res;
  };

  delete = async (url: string) => {
    const res = await this.axiosClient
      .delete(url)
      .then((response: AxiosResponse) => response);
    return res;
  };

  post = async (url: string, payload: any, config?: any) => {
    let res;
    if (config) {
      res = await this.axiosClient
        .post(url, payload, config)
        .then((response: AxiosResponse) => response);
    } else {
      res = await this.axiosClient
        .post(url, payload)
        .then((response: AxiosResponse) => response);
    }
    return res;
  };

  put = async (url: string, payload: any) => {
    const res = await this.axiosClient
      .put(url, payload)
      .then((response: AxiosResponse) => response);
    return res;
  };

  patch = async (url: string, payload: any) => {
    const res = await this.axiosClient
      .patch(url, payload)
      .then((response: AxiosResponse) => response);
    return res;
  };
}
