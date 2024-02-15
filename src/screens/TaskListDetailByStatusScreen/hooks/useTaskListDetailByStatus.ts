import {getTaskById} from 'store/effects/taskStore';
import {TaskListDetailByStatusScreenRouteProp} from '../TaskListDetailByStatusScreen';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {WithDriverTaskDetail, WithoutDriverTaskDetail} from 'types/tasks.types';

export type WithDriverTaskDetailData = WithDriverTaskDetail & {
  item_title: string;
  is_item_processed: boolean;
  item_status: 'DELIVERY_PROCESS' | 'RETURN_TO_GARAGE' | 'TAKE_FROM_GARAGE';
};

const useTaskListDetailByStatus = () => {
  const {type, id, item} =
    useRoute<TaskListDetailByStatusScreenRouteProp>().params;

  const [withoutDriverData, setWithoutDriverData] = useState<
    WithoutDriverTaskDetail[]
  >([]);
  const [withDriverData, setWithDriverData] = useState<
    WithDriverTaskDetailData[]
  >([]);

  const getWithoutDriverTaskDetail = async () => {
    try {
      const res = await getTaskById(id);
      setWithoutDriverData(res?.data || []);
    } catch (error) {
      console.log('err = ', error);
    }
  };

  const getWithDriverTaskDetail = () => {
    if (item) {
      const res = item?.status_details?.map(data => ({
        ...item,
        item_title: data.title,
        is_item_processed: data.is_processed,
        item_status: data.status,
      }));

      setWithDriverData(res || []);
    } else {
      setWithDriverData([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (type === 'Tanpa Supir') {
        getWithoutDriverTaskDetail();
      }
  
      if (type === 'Dengan Supir') {
        getWithDriverTaskDetail();
      }
  
      return () => {
        setWithoutDriverData([]);
        setWithDriverData([]);
      };
    }, []),
  );



  const finalData = useMemo(() => {
    if (type === 'Tanpa Supir') {
      return withoutDriverData;
    }

    if (type === 'Dengan Supir') {
      return withDriverData;
    }

    return [];
  }, [withDriverData.length, withoutDriverData.length]);

  return {data: finalData};
};

export default useTaskListDetailByStatus;
