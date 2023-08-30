import { Alert } from "react-native";
import { apiWithInterceptor } from "utils/interceptorV2";

interface IParamsTasks {
    limit: number;
    page: number;
    task_status: string[];
    courier_id: number;
}

interface IParamUpdateOrder {
    order_status: TASKSTATUS;
    courier_id: number;
}

interface IParamUPdateCourirTasks {
    id: number;
    status: TASKSTATUS;
    note?: string;
    violations?: {
        violation: string;
        cost: number;
    }[];
    /**
   * diisi base64 exp: ["data:image/png;base64,iVBO"]
   */
    image_captures: string[];
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

export const updateOrder = async (params: IParamUpdateOrder) => {
    try {
        const response: any = await apiWithInterceptor({
            method: 'put',
            url: '/api/order',
            data: params,
        });

        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}

export const updateCourirTasks = async (params: IParamUPdateCourirTasks) => {
    try {
        console.log('params = ', params?.id)
        console.log('params = ', params?.note)
        console.log('params = ', params?.status)
        console.log('params = ', params?.violations)
        // console.log('params = ', params?.image_captures)
        const response: any = await apiWithInterceptor({
            method: 'put',
            url: '/api/tasks',
            data: params,
        });

        return response.data;
    } catch (err) {
        console.log('err = ', err);
        console.log('err = ', err?.response);
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}

interface IParamOrderViolations {
    violations:
    {
        violation: string;
        cost: number;
    }[]
    ;
    total_payment: number;
    transaction_key: string;
}

export const updateOrderViolations = async (params: IParamOrderViolations) => {
    try {
        const response: any = await apiWithInterceptor({
            method: 'put',
            url: '/api/orders/' + params?.transaction_key,
            data: params,
        });

        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}

