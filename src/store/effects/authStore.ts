import { Alert } from "react-native";
import { apiWithInterceptor } from "utils/interceptorV2";

export const getUserById = async (id: string) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'get',
      url: '/users/' + id,
    });

    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
}

