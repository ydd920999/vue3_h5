import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { useUserStore } from '@/pinia/user';
import { showNotify, closeNotify } from 'vant';

// 标志位，表示 是否 为正在退出中
let isLogoutIng = false;

const errorHandler = (error: AxiosError) => {
  const userStore = useUserStore();
  if (error.response) {
    const data: any = error.response.data;
    closeNotify();
    if (error.response.status === 404) {
      showNotify({
        type: 'warning',
        message: data?.msg || error.response.statusText,
      });
    }

    if (error.response.status === 400 || error.response.status === 500) {
      showNotify({
        type: 'warning',
        message: data?.msg || error.response.statusText,
      });
    }

    if (error.response.status === 403) {
      showNotify({
        type: 'warning',
        message: data?.msg || error.response.statusText,
      });
    }

    if (error.response.status === 401) {
      if (isLogoutIng) {
        return;
      }
      isLogoutIng = true;
      showNotify({
        type: 'warning',
        message: data?.msg || error.response.statusText,
      });

      userStore.appLogout().then(() => {
        window.location.reload();
      });
    }
  }
  return Promise.reject(error);
};

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status;
  /** notice text */
  let message = 'Request Error';
  switch (code) {
    case 400:
      message = 'Request Error';
      break;
    case 401:
      message = 'Unauthorized, please login';
      break;
    case 403:
      message = '拒绝访问';
      break;
    case 404:
      message = '访问资源不存在';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '位置错误';
      break;
    case 501:
      message = '承载服务未实现';
      break;
    case 502:
      message = '网关错误';
      break;
    case 503:
      message = '服务暂不可用';
      break;
    case 504:
      message = '网关超时';
      break;
    case 505:
      message = '暂不支持的 HTTP 版本';
      break;
    default:
      message = '位置错误';
  }
  return message;
};

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_PREFIX,
  timeout: 10000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    clientId: 'seeker_web',
  },
});

const downFile = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_PREFIX,
  withCredentials: false,
  responseType: 'blob',
  headers: {
    'Content-Type': 'application/json',
    clientId: 'seeker_web',
  },
});

axiosInstance.interceptors.request.use(config => {
  const userStore = useUserStore();
  config.headers[userStore.tokenHeader] = userStore.token || '';
  return config;
}, errorHandler);

export const downloader = async (
  url: string,
  resOpts: AxiosRequestConfig,
): Promise<AxiosResponse<any>> => {
  const { method = 'get', data = '', ...args } = resOpts;
  const userStore = useUserStore();
  const queryArgs = {
    url,
    method,
    data,
    headers: {
      [userStore.tokenHeader]: userStore.token,
    },
    ...args,
  };
  return downFile.request(queryArgs);
};

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    const __text = getErrorCode2text(response);
    return Promise.reject(new Error(__text));
  }
}, errorHandler);

const service = <T>({
  url,
  method = 'get',
  params,
  data,
  ...args
}: AxiosRequestConfig) =>
  axiosInstance.request<unknown, T>({
    url,
    method,
    params,
    data,
    ...args,
  });

export default service;

export function getHeaders() {
  const userStore = useUserStore();
  return {
    clientId: 'seeker_web',
    [userStore.tokenHeader]: userStore.token,
  };
}
