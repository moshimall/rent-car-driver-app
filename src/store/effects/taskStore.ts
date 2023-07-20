import { Alert } from "react-native";
import { apiWithInterceptor } from "utils/interceptorV2";

interface IParamsTasks {
    limit: number;
    page: number;
    task_status: "DELIVERY_PROCESS" | "PICKUP_PROCESS" | "DELIVERED" | "PICKED" | "RETURNED";
    courier_id: number;
}
export const getTasks = async (paramsFilter: IParamsTasks) => {
    const params =
        '?' +
        new URLSearchParams(paramsFilter as any).toString();

        console.log('params = ', params)
        // return;

    try {
        const response: any = await apiWithInterceptor({
            method: 'get',
            url: '/api/tasks' + params,
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}
