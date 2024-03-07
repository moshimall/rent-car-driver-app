import BottomSheet, {BottomSheetModal} from '@gorhom/bottom-sheet';
import Button from 'components/Button';
import CustomBackdrop from 'components/CustomBackdrop';
import hoc from 'components/hoc';
import LoadingNextPage from 'components/LoadingNextPage/LoadingNextPage';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  DataItemTask,
  Pagination,
  WithDriverTaskDetail,
  WithoutDriverTaskDetail,
} from 'types/tasks.types';
import {deepClone, theme} from 'utils';
import {getPlayerId} from 'store/effects/authStore';
import {getOngoingTasks, getTasks} from 'store/effects/taskStore';
import {h1, h4} from 'utils/styles';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {ITypeTask} from 'types/navigator';
import {
  NavigationHelpers,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ic_car1,
  ic_checkblue,
  ic_main_icon,
  ic_no_task,
  ic_plane,
  ic_radio_button,
  ic_selected_radio_button,
  ic_uncheckblue,
  ic_with_driver,
  ic_without_driver,
} from 'assets/icons';
import CardAmbilMobil from 'components/Cards/CardAmbilMobil';
import CardAntarMobil from 'components/Cards/CardAntarMobil';
import CardParkirMobil from 'components/Cards/CardParkirMobil';
import CardTakeFromGarage from 'components/Cards/CardTakeFromGarage';
import TaskDetailByStatusCard from 'components/Cards/TaskDetailByStatusCard';
import {useAuthStore} from 'store/actions/authStore';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationHelpers<ParamListBase>>();
  const role_name = useAuthStore((state: any) => state.role_name);

  const [changebg, setChangebg] = useState(true);
  const [tasks, setTasks] = useState<DataItemTask[]>([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
  });

  const [ongoingTask, setOngoingTask] = useState<
    WithoutDriverTaskDetail[] | WithDriverTaskDetail[]
  >([]);

  const [sorting, setSorting] = useState(0);
  const [jobdesk, setJobdesk] = useState<number[]>([0, 1, 2]);

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setChangebg(true);
    } else {
      setChangebg(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      _getTasks();
      _getOngoingTask();
      getPlayerId();
    }, []),
  );

  useEffect(() => {
    let _ = deepClone(tasks);
    _.sort((a: any, b: any) => {
      const dateA: any = new Date(a.order.order_detail.start_booking_date);
      const dateB: any = new Date(b.order.order_detail.start_booking_date);
      if (sorting === 0) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setTasks(_);

    return () => {};
  }, [sorting]);

  const _getTasks = async () => {
    setLoader(true);
    let param = {
      courier_id: 1,
      limit: pagination?.limit || 0,
      page: pagination?.page || 1,
    } as any;
    const VALUE = ['DELIVERY_PROCESS', 'PICKUP_PROCESS', 'RETURNED'];
    let _: any = [];
    jobdesk?.map((x, i) => {
      _.push(VALUE[x]);
    });
    param['task_status'] = _;

    console.log('jobdesk = ', param);
    let res = await getTasks(param as any);
    // console.log('res = ', JSON.stringify(res));
    setTasks(res?.data);
    setPagination(res?.pagination);
    setLoader(false);
  };

  const _getOngoingTask = async () => {
    try {
      const res = await getOngoingTasks();
      if (!res || res?.id === 0) {
        setOngoingTask([]);
        return;
      }
      setOngoingTask([res]);
      console.log('ongoing tasks = ', res);
    } catch (error) {}
  };

  const handleFilter = async () => {
    _getTasks();
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

  const MENU: {ic: any; name: ITypeTask, role: string[]}[] = [
    {
      ic: ic_without_driver,
      name: 'Tanpa Supir',
      role: ['Courier'],
    },
    {
      ic: ic_with_driver,
      name: 'Dengan Supir',
      role: ['Driver']
    },
    {
      ic: ic_plane,
      name: 'Airport Transfer',
      role: [],
    },
    {
      ic: ic_car1,
      name: 'Tour',
      role: [],
    },
  ];

  const renderItem = ({item}: {item: any}) => {
    if (role_name === 'Courier') {
      if (item?.status === 'DELIVERY_PROCESS') {
        return <CardTakeFromGarage item={{...item, task_id: item?.id}} />;
      }

      if (item?.status === 'TAKE_FROM_GARAGE') {
        return <CardAntarMobil item={{...item, task_id: item?.id}} />;
      }

      if (item?.status === 'DELIVERY_CAR') {
        return <CardAmbilMobil item={{...item, task_id: item?.id}} />;
      }

      if (item?.status === 'TAKE_CAR') {
        return <CardParkirMobil item={{...item, task_id: item?.id}} />;
      }
    }

    if (role_name === 'Driver') {
      return (
        <TaskDetailByStatusCard
          id={item?.id}
          item={item}
          type={'Dengan Supir'}
        />
      );
    }

    return <></>;
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 16, backgroundColor: '#fff'}}>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image source={ic_main_icon} style={iconCustomSize(45)} />
            <Text style={styles.textName}>Driver</Text>
          </View>
          <Text style={[styles.textName, {}]}>Halo, Driver</Text>
        </View>
      </View>

      <View style={[rowCenter, styles.menuWrapper]}>
        {MENU.filter(x => x.role?.includes(role_name))?.map((x, i) => (
          <TouchableOpacity
            key={i}
            style={{alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('TaskListByType', {type: x?.name});
            }}>
            <View
              style={{
                padding: 10,
                backgroundColor: '#E3F1FF',
                borderRadius: 10,
              }}>
              <Image source={x?.ic} style={[iconSize]} />
            </View>
            <Text style={[h4, {fontSize: 12}]}>{x?.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={[
          rowCenter,
          {
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 20,
          },
        ]}>
        <Text style={[h1, {marginRight: 5, color: theme.colors.navy}]}>
          Sedang Berjalan
        </Text>
      </View>
      <View style={{margin: 16}}>
        <FlatList
          data={[...(ongoingTask || [])]}
          // data={[...Array(5)]}
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
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={backdropProps => (
          <CustomBackdrop
            {...backdropProps}
            disappearsOnIndex={-1}
            enableTouchThrough={true}
            pressBehavior={'close'}
          />
        )}
        backgroundStyle={{backgroundColor: theme.colors.white}}
        handleStyle={{marginBottom: 8, marginTop: 4}}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.75,
          shadowRadius: 24,

          elevation: 24,
        }}>
        <View style={styles.contentContainer}>
          <Text style={[h1, {fontSize: 20}]}>Filter Berdasarkan</Text>

          <Text style={[h1, {fontSize: 15, marginTop: 20, marginBottom: 10}]}>
            Sort
          </Text>

          {SORT.map((x, i) => (
            <TouchableOpacity
              key={`index_${i}`}
              onPress={() => setSorting(i)}
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginBottom: 10},
              ]}>
              <Text style={styles.text}>{x}</Text>

              <Image
                source={
                  sorting === i ? ic_selected_radio_button : ic_radio_button
                }
                style={iconSize}
              />
            </TouchableOpacity>
          ))}

          <Text style={[h1, {fontSize: 15, marginTop: 20, marginBottom: 10}]}>
            Jobdesk
          </Text>

          {JOBDESK.map((x, i) => (
            <TouchableOpacity
              key={`index_${i}`}
              onPress={() => {
                let _ = deepClone(jobdesk);
                let idx = jobdesk.findIndex(y => y === i);
                if (idx === -1) {
                  _.push(i);
                } else {
                  _.splice(idx, 1);
                }
                setJobdesk(_);
                console.log('_ = ', _);
              }}
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginBottom: 10},
              ]}>
              <Text style={styles.text}>{x}</Text>

              <Image
                source={
                  jobdesk.filter(z => z === i)?.length === 1
                    ? ic_checkblue
                    : ic_uncheckblue
                }
                style={iconSize}
              />
            </TouchableOpacity>
          ))}

          <Button
            _theme="navy"
            title={'Konfirmasi'}
            onPress={() => {
              if (bottomSheetRef?.current) bottomSheetRef?.current.close();
              handleFilter();
            }}
            styleWrapper={{marginTop: 10}}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const SORT = ['Paling Baru', 'Paling Lama'];
const JOBDESK = ['Antar Mobil', 'Ambil Mobil', 'Parkir ke Garasi'];

export default hoc(HomeScreen, theme.colors.white, false, 'dark-content');

const styles = StyleSheet.create({
  textName: {
    fontSize: 18,
    color: theme.colors.navy,
    fontWeight: '700',
    marginLeft: 10,
  },
  rightIcon: {
    height: 45,
    width: 45,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
  },
  container: {backgroundColor: '#F5F6FA', flex: 1, zIndex: 99},
  activeButton: {
    backgroundColor: theme.colors.white,
    width: '33.3%',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: theme.colors.navy,
    borderBottomWidth: 2,
  },
  activeText: {
    fontSize: 12,
    color: theme.colors.navy,
    fontWeight: 'bold',
  },

  inactiveButton: {
    backgroundColor: theme.colors.white,
    width: '33.3%',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: theme.colors.white,
    borderBottomWidth: 2,
  },
  inactiveText: {
    fontSize: 12,
    color: '#B5B5B5',
    fontWeight: '500',
  },
  textOrderId: {fontSize: 12, fontWeight: 'bold'},
  textTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A8A8A8',
  },
  textLocation: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    marginTop: 8,
  },
  lineVertical: {
    height: 25,
    width: 1,
    marginLeft: 20,
    marginVertical: 5,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  lineHorizontal: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 30,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    marginVertical: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  textComment: {
    color: '#A8A8A8',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 20,
  },
  container2: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    margin: 20,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: theme.colors.black,
  },
  menuWrapper: {
    justifyContent: 'space-between',
    margin: 20,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 10,
    padding: 20,
  },
});
