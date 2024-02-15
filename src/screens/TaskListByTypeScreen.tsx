import appBar from 'components/AppBar/AppBar';
import LoadingNextPage from 'components/LoadingNextPage/LoadingNextPage';
import React, {useEffect, useState} from 'react';
import {DataItemTask, Pagination} from 'types/tasks.types';
import {getTasks} from 'store/effects/taskStore';
import {h1} from 'utils/styles';
import {ic_arrow_left_white, ic_no_task, ic_progress_clock} from 'assets/icons';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import hoc from 'components/hoc';
import { theme } from 'utils';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskListByType'>;

const TaskListByTypeScreen = () => {
  const navigation = useNavigation();
  const {type} = useRoute<ScreenRouteProp>().params;
  const [tasks, setTasks] = useState<DataItemTask[]>([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={rowCenter}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_white}
              style={{
                height: 20,
                width: 20,
                marginLeft: 16,
              }}
            />
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>{type}</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const _getTasks = async () => {
    setLoader(true);
    let param = {
      courier_id: 1,
      limit: pagination?.limit || 0,
      page: pagination?.page || 1,
    } as any;
    const VALUE = ['DELIVERY_PROCESS', 'PICKUP_PROCESS', 'RETURNED'];
    let _: any = [];
    param['task_status'] = _;

    let res = await getTasks(param as any);
    setTasks(res?.data);
    setPagination(res?.pagination);
    setLoader(false);
  };

  const handleMore = () => {
    if (pagination?.page < (pagination?.total_page || 0) && !loader) {
      setRefresh(true);
      _getTasks();
      setRefresh(false);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    setPagination({
      limit: 10,
      page: 1,
    });
    _getTasks();
    setRefresh(false);
  };

  const handleNavigateTask = (item: DataItemTask) => {
    if (type === 'Tanpa Supir') {
      navigation.navigate('TaskListDetailByStatus', {
        type: type,
        id: item?.id,
      });
    }

    if (type === 'Dengan Supir') {
      navigation.navigate('TaskListDetailByDay', {
        type: type,
        id: item?.id,
      });
    }
  };

  const renderItem = ({item}: {item: DataItemTask}) => {
    return (
      <TouchableOpacity
        style={[rowCenter, styles.cardItem]}
        onPress={() => handleNavigateTask(item)}>
        <View>
          <Text
            style={{
              fontSize: 12,
            }}>
            <Text style={{fontWeight: '700'}}>Task ID</Text>: {item?.task_key}
          </Text>

          <Text style={{fontSize: 14, marginVertical: 5}}>
            {item?.customer_name} | {item?.vehicle_name}
          </Text>
          <Text style={{fontSize: 12, color: '#666'}}>
            {item?.start_date} - {item?.end_date}
          </Text>
        </View>

        <View style={[rowCenter]}>
          <Image source={ic_progress_clock} style={iconCustomSize(15)} />
          <Text style={{fontSize: 12, marginLeft: 5}}>
            {item?.process_of_done}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    _getTasks();
  }, []);

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        data={[...(tasks || [])]}
        renderItem={renderItem}
        keyExtractor={(x, i) => i.toString()}
        ListFooterComponent={<LoadingNextPage loading={loader} />}
        refreshing={refresh}
        onRefresh={() => {
          return handleRefresh();
        }}
        onEndReached={handleMore}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20%',
            }}>
            <Image
              source={ic_no_task}
              style={{width: 150, height: 150, marginBottom: 20}}
            />
            <Text>Belum Mengambil Tugas</Text>
          </View>
        )}
      />
    </View>
  );
};

export default hoc(
  TaskListByTypeScreen,
  theme.colors.navy,
  false,
  'light-content',
);

const styles = StyleSheet.create({
  cardItem: {
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 6,
    alignItems: 'flex-start',
  },
});
