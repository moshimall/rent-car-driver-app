import { Alert } from "react-native";
import { OneSignal } from "react-native-onesignal";
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



export const createPlayer = async (body: any) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'post',
      url: '/notifications/players',
      data: body,
    });

    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

export const getPlayerId = async () => {
  try {
    const subId = OneSignal.User.pushSubscription.getPushSubscriptionId();
    // const subToken = OneSignal.User.pushSubscription.getPushSubscriptionToken();

    try {
      const res = await createPlayer({
        player_id: subId,
      });
      // console.log('ress = ', res);
    } catch (error) {
      console.log('err = ', error);
    }
  } catch (error) {
    console.log('err = ', error);
  }
};
