import Config from 'react-native-config';
import {ApisauceConfig, create} from 'apisauce';
import {useAuthStore} from 'store/actions/authStore';
import { showToast } from './Toast';

type ApiConfig = {
  method: ApisauceConfig['method'];
  url: ApisauceConfig['url'];
  data?: ApisauceConfig['data'];
};

export const apiWithInterceptor = async (config: ApiConfig) => {
  const api = create({} as any);

  api.axiosInstance.interceptors.request.use(
    (request: any) => {
      try {
        const state: any = useAuthStore.getState();
        request.baseURL = Config.URL_API;
        request.timeout = 10000;
        request.headers.Authorization =
          'Bearer ' + state?.authToken?.access_token;
        return request;
      } catch (error) { }
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );

  api.axiosInstance.interceptors.response.use(
    function (successRes) {
      return successRes;
    },
    async function (error) {
      try {
        console.log('error', error.config.url);
        console.log('error.response.status', error.response.status);
        console.log('error.response.data', error.response.data);

        const state: any = useAuthStore.getState();
        if (error.response.status === 401) {
          // const refresh_token = state?.authToken?.access_token;
          state.logout()
          showToast({
            message: 'token expired',
            title: 'error',
            type: 'error'
          })
          return;
        }

        if (error.response.status === 404) {
          return [];
        }

        return Promise.reject(error);
      } catch (e) { }
    },
  );

  const res = await api.axiosInstance.request(config);

  return res;
};
