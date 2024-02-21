import {
  getTaskById,
  getWithDriverTaskDetailByDate,
} from 'store/effects/taskStore';
import {TaskListDetailByStatusScreenRouteProp} from '../TaskListDetailByStatusScreen';
import {useCallback, useMemo, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {WithDriverTaskDetail, WithoutDriverTaskDetail} from 'types/tasks.types';

const useTaskListDetailByStatus = () => {
  const {type, id, item} =
    useRoute<TaskListDetailByStatusScreenRouteProp>().params;

  const [withoutDriverData, setWithoutDriverData] = useState<
    WithoutDriverTaskDetail[]
  >([]);
  const [withDriverData, setWithDriverData] = useState<WithDriverTaskDetail[]>(
    [],
  );
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

  const getWithDriverTaskDetail = async () => {
    try {
      setIsLoading(true);

      if (item) {
        const res = await getWithDriverTaskDetailByDate(id, item.date);
        setWithDriverData(res?.data || []);
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
    data: finalData as (WithDriverTaskDetail & WithoutDriverTaskDetail)[],
    isLoading,
  };
};

export default useTaskListDetailByStatus;
