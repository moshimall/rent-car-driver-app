import {Alert} from 'react-native';
import {TaskStatus} from 'types/tasks.types';
import {apiWithInterceptor} from 'utils/interceptorV2';

interface IParamsTasks {
  limit: number;
  page: number;
  task_status: string[];
  courier_id: number;
}

interface IParamUpdateOrder {
  order_status: TaskStatus;
  courier_id: number;
}

export interface IParamUPdateCourirTasks {
  id: number;
  status: TaskStatus;
  note?: string;
  violations?: {
    violation: string;
    cost: number;
  }[];
  /**
   * diisi base64 exp: ["data:image/png;base64,iVBO"]
   */
  image_captures: string[];
  date?: string;
}

export const getTasks = async (paramsFilter: IParamsTasks) => {
  let _param = {
    limit: paramsFilter?.limit,
    page: paramsFilter?.page,
    courier_id: paramsFilter?.courier_id,
  };
  let params = '?' + new URLSearchParams(_param as any).toString();

  if ('task_status' in paramsFilter && paramsFilter?.task_status?.length > 0) {
    paramsFilter?.task_status?.map(x => {
      params += '&task_status[]=' + x;
    });
  }

  console.log('params = ', params);
  // return;

  try {
    const response: any = await apiWithInterceptor({
      method: 'get',
      url: '/tasks' + params,
    });
    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};


export const getOngoingTasks = async () => {

  try {
    const response: any = await apiWithInterceptor({
      method: 'get',
      url: '/tasks/ongoing',
    });
    return response.data;
  } catch (error) {
    // Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

export const updateOrder = async (params: IParamUpdateOrder) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'put',
      url: '/order',
      data: params,
    });

    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

export const updateCourirTasks = async (params: IParamUPdateCourirTasks) => {
  try {
    // console.log('params = ', params?.image_captures)
    const response = await apiWithInterceptor({
      method: 'put',
      url: `/tasks/${params?.id}`,
      data: params,
    });
    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (err) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

interface IParamOrderViolations {
  violations: {
    violation: string;
    cost: number;
  }[];
  total_payment: number;
  transaction_key: string;
}

export const updateOrderViolations = async (params: IParamOrderViolations) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'put',
      url: '/orders/' + params?.transaction_key,
      data: params,
    });

    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

export const getTaskById = async (taskId: number) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'get',
      url: '/tasks/' + taskId,
    });

    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

export const getWithDriverTaskDetailByDate = async (taskId: number, date: string) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'get',
      url: '/tasks/' + taskId + '/details?date=' + date,
    });

    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

export const getNotes = async (taskId: number) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'get',
      url: `/tasks/${taskId}/notes`,
    });
    console.log('get nhotes = ', response?.data);
    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};

export const getVehicleById = async (id: number) => {
  try {
    const response: any = await apiWithInterceptor({
      method: 'get',
      url: '/admin/vehicles/' + id,
    });
    // console.log('id res = ', response?.data);
    return response.data;
  } catch (error) {
    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
  }
};
