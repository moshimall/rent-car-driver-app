// import store from 'redux/store';
import { URL_API } from '@env';
import {ApisauceConfig, create} from 'apisauce';
import { useAuthStore } from 'store/actions/authStore';
import { showToast } from './Toast';
// import {logout} from 'redux/features/auth/authSlice';
// import {refreshToken} from 'redux/features/auth/authAPI';
// import base64 from 'base-64';

// import {BASE_URL, BASIC_PASSWORD, BASIC_USERNAME} from '@env';

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

        console.log('URL_API = ', URL_API + request.url);
        request.baseURL = URL_API;
        request.timeout = 10000;
        request.headers.Authorization = 'Bearer ' + state?.authToken?.access_token;
        console.log('request.headers.Authorization = ', request.headers.Authorization);
        return request;
      } catch (error) {}
    },
    (error:any) => {
      return Promise.reject(error);
    },
  );

  api.axiosInstance.interceptors.response.use(
    function (successRes) {
      return successRes;
    },
    function (error) {
      try {
        console.log('error', error.config.url);
        console.log(error.response.status);
        const state: any = useAuthStore.getState();
        if (error.response.status === 401) {
          // const refresh_token = store?.getState()?.auth?.auth.refresh_token;
          state.logout()
          showToast({
            message: 'token expired',
            title: 'error',
            type: 'error'
          })
          // if (
          //   refresh_token &&
          //   error.response.data?.slug !== 'refresh-token-invalid'
          // ) {
          //   // store.dispatch(refreshToken(refresh_token as any));
          //   return api.axiosInstance.request(error.config);
          // } else {
          //   // store.dispatch(logout());
          // }
        }
        return Promise.reject(error);
      } catch (e) {}
    },
  );

  const res = await api.axiosInstance.request(config);

  return res;
};
