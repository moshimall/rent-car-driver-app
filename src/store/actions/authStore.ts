// import { IHelpers, IToastParams } from 'types/store.types';
import { apiWithInterceptor } from 'utils/interceptorV2';
import { SetState, create } from 'zustand';
import { Alert } from 'react-native';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create<any>(
  persist(
    (set: SetState<any>) => ({
      isAuthenticated: false,
      authToken: {},
      login: async (username: string, password: string) => {
        try {
          const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/authorization',
            data: {
              email: username,
              password: password,
              scope: "backoffice"
            },
          });
          console.log('res login = ', response.data)
          set(() => ({
            isAuthenticated: true,
            authToken: { ...response?.data },
          }));
        } catch (error) {
          Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
        }
      },
      logout: () => {
        set(() => ({
          isAuthenticated: false,
          authToken: {},
        }));
      }
    }), {
    name: 'auth',
    storage: createJSONStorage(() => AsyncStorage),
  }));
export {
  useAuthStore
}