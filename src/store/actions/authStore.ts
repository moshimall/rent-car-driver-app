import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {apiWithInterceptor} from 'utils/interceptorV2';
import {create, SetState} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {jwtDecode} from 'jwt-decode';

const useAuthStore = create<any>(
  persist(
    (set: SetState<any>) => ({
      isAuthenticated: false,
      role_name: '',
      authToken: {},
      login: async (username: string, password: string) => {
        try {
          const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/authorization',
            data: {
              email: username,
              password: password,
              scope: 'app',
            },
          });
          const token = response?.data?.access_token;
          const decoded: any = jwtDecode(token);

          console.log(decoded);
          set(() => ({
            isAuthenticated: true,
            authToken: {...response?.data},
            id: decoded?.payload?.id,
            role_name: decoded?.payload?.roles?.role_name,
          }));
        } catch (error: any) {
          Alert.alert(
            'Warning',
            error?.response?.data?.message ||
              'Terjadi kesalahan, silahkan hubungi admin.',
          );
        }
      },
      getUserDetails: async (id: number) => {
        try {
          const response: any = await apiWithInterceptor({
            method: 'get',
            url: `/users/${id}`,
          });

          set(() => ({
            isAuthenticated: true,
            userData: {...response?.data},
          }));
        } catch (error: any) {
          Alert.alert(
            'Warning',
            error?.response?.data?.message ||
              'Terjadi kesalahan, silahkan hubungi admin.',
          );
        }
      },
      refreshToken: async (token: string) => {
        try {
          const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/authorization/refresh',
            data: {refresh_token: token},
          });
          console.log('res login = ', response.data);
          set(() => ({
            isAuthenticated: true,
            authToken: {...response?.data},
          }));
        } catch (error: any) {
          Alert.alert(
            'Warning',
            error?.response?.data?.message ||
              'Terjadi kesalahan, silahkan hubungi admin.',
          );
        }
      },
      logout: () => {
        set(() => ({
          isAuthenticated: false,
          authToken: {},
        }));
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
export {useAuthStore};
