import appBar from 'components/AppBar/AppBar';
import CardAmbilMobil from 'components/Cards/CardAmbilMobil';
import CardAntarMobil from 'components/Cards/CardAntarMobil';
import CardParkirMobil from 'components/Cards/CardParkirMobil';
import CardTakeFromGarage from 'components/Cards/CardTakeFromGarage';
import hoc from 'components/hoc';
import React, {useEffect, useMemo} from 'react';
import TaskDetailByStatusCard from '../../components/Cards/TaskDetailByStatusCard';
import useTaskListDetailByStatus from './hooks/useTaskListDetailByStatus';
import {h1} from 'utils/styles';
import {ic_arrow_left_white, ic_check} from 'assets/icons';
import {iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {TaskStatus} from 'types/tasks.types';
import {theme} from 'utils';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type TaskListDetailByStatusScreenRouteProp = RouteProp<
  RootStackParamList,
  'TaskListDetailByStatus'
>;
type IPropsStatus = {title: IStatus; status: TaskStatus; is_prcessed?: boolean};
type IStatus =
  | 'Ambil dari Garasi'
  | 'Antar Mobil'
  | 'Ambil Mobil'
  | 'Parkir ke Garasi';

const WITHOUT_DRIVER_STATUS: IPropsStatus[] = [
  {title: 'Ambil dari Garasi', status: 'TAKE_FROM_GARAGE'},
  {title: 'Antar Mobil', status: 'DELIVERY_CAR'},
  {title: 'Ambil Mobil', status: 'TAKE_CAR'},
  {title: 'Parkir ke Garasi', status: 'RETURN_TO_GARAGE'},
];

const WITH_DRIVER_STATUS: IPropsStatus[] = [
  {
    title: 'Ambil dari Garasi',
    status: 'TAKE_FROM_GARAGE',
  },
  {
    title: 'Parkir ke Garasi',
    status: 'RETURN_TO_GARAGE',
  },
];

const TaskListDetailByStatusScreen = () => {
  const navigation = useNavigation();
  const {type, id} = useRoute<TaskListDetailByStatusScreenRouteProp>().params;
  const {data} = useTaskListDetailByStatus();

  const taskStatus =
    type === 'Dengan Supir' ? WITH_DRIVER_STATUS : WITHOUT_DRIVER_STATUS;

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

  const renderItem = ({item}: {item: any}) => {
    if (type === 'Tanpa Supir') {
      if (item?.status === 'DELIVERY_PROCESS') {
        return <CardTakeFromGarage item={{...item, task_id: id}} />;
      }

      if (item?.status === 'TAKE_FROM_GARAGE') {
        return <CardAntarMobil item={{...item, task_id: id}} />;
      }

      if (item?.status === 'DELIVERY_CAR') {
        return <CardAmbilMobil item={{...item, task_id: id}} />;
      }

      if (item?.status === 'TAKE_CAR') {
        return <CardParkirMobil item={{...item, task_id: id}} />;
      }
    }

    if (type === 'Dengan Supir') {
      return <TaskDetailByStatusCard id={id} item={item} type={type} />;
    }

    return <></>;
  };

  const findIndex = useMemo(() => {
    if (data.length) {
      return taskStatus.findIndex(x => x?.status === data?.[0]?.status);
    }

    return -1;
  }, [data.length]);

  const taskStep = useMemo(() => {
    if (data.length) {
      return taskStatus.map(task => {
        return {
          ...task,
          is_prcessed: !!data.find(
            x => x.item_status === task.status && x.is_item_processed,
          )?.title,
        };
      });
    }

    return taskStatus;
  }, [data.length]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <View
          style={[rowCenter, {paddingHorizontal: 30, alignItems: 'center'}]}>
          {taskStep.map((status, i) => (
            <View key={i}>
              <View
                style={[
                  rowCenter,
                  {
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  {taskStep?.[i]?.is_prcessed ? (
                    <Image source={ic_check} style={iconSize} />
                  ) : (
                    <View
                      style={[
                        styles.dot,
                        {backgroundColor: theme.colors.grey6},
                      ]}
                    />
                  )}
                  <View style={styles.textDotWrapper}>
                    <Text style={styles.textStatus}>{status.title}</Text>
                  </View>
                </View>
                {i != taskStatus.length - 1 && <View style={styles.line} />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          padding: 20,
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(x, i) => i.toString()}
      />
    </View>
  );
};

export default hoc(
  TaskListDetailByStatusScreen,
  theme.colors.navy,
  false,
  'light-content',
);

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
