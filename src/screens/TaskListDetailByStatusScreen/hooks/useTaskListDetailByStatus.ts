import {getTaskById} from 'store/effects/taskStore';
import {TaskListDetailByStatusScreenRouteProp} from '../TaskListDetailByStatusScreen';
import {useCallback, useMemo, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {TaskStatus, WithDriverTaskDetail, WithoutDriverTaskDetail} from 'types/tasks.types';

export type WithDriverTaskDetailData = WithDriverTaskDetail & {
  item_title: string;
  is_item_processed: boolean;
  item_status: TaskStatus;
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
  const [isLoading, setIsLoading] = useState(false);

  const getWithoutDriverTaskDetail = async () => {
    try {
      setIsLoading(true);

      const res = await getTaskById(id);
      setWithoutDriverData(res?.data || []);
    } catch (error) {
      console.log('err getWithoutDriverTaskDetail = ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWithDriverTaskDetail = () => {
    try {
      setIsLoading(true);

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
    } catch (error) {
      console.log('err getWithDriverTaskDetail = ', error);
    } finally {
      setIsLoading(false);
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

  return {
    data: finalData as (WithDriverTaskDetailData & WithoutDriverTaskDetail)[],
    isLoading,
  };
};

export default useTaskListDetailByStatus;
