import appBar from 'components/AppBar/AppBar';
import CardAmbilMobil from 'components/Cards/WithoutDriver/CardAmbilMobil';
import CardAntarMobil from 'components/Cards/WithoutDriver/CardAntarMobil';
import CardParkirMobil from 'components/Cards/WithoutDriver/CardParkirMobil';
import CardTakeFromGarage from 'components/Cards/WithoutDriver/CardTakeFromGarage';
import React, {useEffect, useState} from 'react';
import {DataItemTask, Pagination} from 'types/tasks.types';
import {getTasks} from 'store/effects/taskStore';
import {h1} from 'utils/styles';
import {ic_arrow_left_white, ic_no_task} from 'assets/icons';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {theme} from 'utils';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoadingNextPage from 'components/LoadingNextPage/LoadingNextPage';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskListDetailByStatus'>;

type IStatus =
  | 'Ambil dari Garasi'
  | 'Antar Mobil'
  | 'Ambil Mobil'
  | 'Parkir ke Garasi';

const DATA_STATUS: IStatus[] = [
  'Ambil dari Garasi',
  'Antar Mobil',
  'Ambil Mobil',
  'Parkir ke Garasi',
];

const TaskListDetailByStatusScreen = () => {
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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              Tugas Driver - {type}
            </Text>
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

  const renderItem = ({item}: {item: DataItemTask}) => {
    if (item?.status === 'DELIVERY_PROCESS') {
      return <CardAntarMobil item={item} />;
    }

    if (item?.status === 'PICKUP_PROCESS') {
      return <CardAmbilMobil item={item} />;
    }

    if (item?.status === 'RETURNED') {
      return <CardParkirMobil item={item} />;
    }

    return <></>;
  };

  useEffect(() => {
    _getTasks();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <View
          style={[rowCenter, {paddingHorizontal: 30, alignItems: 'center'}]}>
          {DATA_STATUS.map((status, i) => (
            <View key={i}>
              <View
                style={[
                  rowCenter,
                  {
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  <View style={styles.dot} />
                  <View style={styles.textDotWrapper}>
                    <Text style={styles.textStatus}>{status}</Text>
                  </View>
                </View>
                {i != DATA_STATUS.length - 1 && <View style={styles.line} />}
              </View>
            </View>
          ))}
        </View>
      </View>
      <FlatList
        style={{
          margin: 20,
        }}
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

export default TaskListDetailByStatusScreen;

const styles = StyleSheet.create({
  dot: {
    height: 20,
    width: 20,
    backgroundColor: theme.colors.navy,
    borderRadius: WINDOW_WIDTH / 2,
  },
  line: {
    borderBottomWidth: 1.5,
    borderBottomColor: theme.colors.grey5,
    width: WINDOW_WIDTH / 5,
  },
  textDotWrapper: {
    position: 'absolute',
    width: WINDOW_WIDTH / 3.5,
    top: 25,
    alignSelf: 'center',
  },
  textStatus: {
    fontSize: 12,
    textAlign: 'center',
  },
});
