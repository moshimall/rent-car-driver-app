import { Alert } from "react-native";
import { apiWithInterceptor } from "utils/interceptorV2";

interface IParamsTasks {
    limit: number;
    page: number;
    task_status: string[];
    courier_id: number;
}
type TASKSTATUS = "DELIVERY_PROCESS" | "PICKUP_PROCESS" | "DELIVERED" | "PICKED" | "RETURNED";
export const getTasks = async (paramsFilter: IParamsTasks) => {
    let _param = {
        limit: paramsFilter?.limit,
        page: paramsFilter?.page,
        courier_id: paramsFilter?.courier_id
    }
    let params =
        '?' +
        new URLSearchParams(_param as any).toString();

    if ('task_status' in paramsFilter && paramsFilter?.task_status?.length > 0) {
        paramsFilter?.task_status?.map((x) => {
            params += '&task_status[]=' + x
        })
    }


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
