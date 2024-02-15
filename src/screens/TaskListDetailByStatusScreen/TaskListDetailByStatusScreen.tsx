import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useEffect} from 'react';
import useTaskListDetailByStatus from './hooks/useTaskListDetailByStatus';
import TaskDetailByStatusCard from '../../components/Cards/TaskDetailByStatusCard';
import {h1} from 'utils/styles';
import {ic_arrow_left_white, ic_check} from 'assets/icons';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {theme} from 'utils';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardAmbilMobil from 'components/Cards/CardAmbilMobil';
import CardAntarMobil from 'components/Cards/CardAntarMobil';
import CardParkirMobil from 'components/Cards/CardParkirMobil';
import CardTakeFromGarage from 'components/Cards/CardTakeFromGarage';
import {TaskStatus} from 'types/tasks.types';

export type TaskListDetailByStatusScreenRouteProp = RouteProp<
  RootStackParamList,
  'TaskListDetailByStatus'
>;
type IPropsStatus = {title: IStatus; status: TaskStatus};
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

    return <TaskDetailByStatusCard id={id} item={item} type={type} />;
  };

  const findIndex = taskStatus.findIndex(x => x?.status === data[0]?.status);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <View
          style={[rowCenter, {paddingHorizontal: 30, alignItems: 'center'}]}>
          {taskStatus.map((status, i) => (
            <View key={i}>
              <View
                style={[
                  rowCenter,
                  {
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  {taskStatus[i]?.status ===
                  taskStatus[findIndex + 1]?.status ? (
                    <View style={styles.dot} />
                  ) : findIndex < i || data?.length === 0 ? (
                    <View
                      style={[
                        styles.dot,
                        {backgroundColor: theme.colors.grey6},
                      ]}
                    />
                  ) : (
                    <Image source={ic_check} style={iconSize} />
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
        // data={[...dummy]}
        renderItem={renderItem}
        keyExtractor={(x, i) => i.toString()}
      />
    </View>
  );
};

// "DELIVERY_PROCESS" | "TAKE_FROM_GARAGE" | "DELIVERY_CAR" | "TAKE_CAR" | "RETURN_TO_GARAGE";
const data = [
  {
    task_key: 'T123456',
    status: 'RETURN_TO_GARAGE',
    customer_name: 'John Doe',
    task_id: 987,
    vehicle_name: 'Toyota Camry',
    start_date: '2024-02-15T09:00:00',
    end_date: '2024-02-15T18:00:00',
    customer_id: 'C789',
    id: 123,
    order: {
      identity: null,
      rental_start_time: '2024-02-15T09:00:00',
      return_location_detail: '123 Main St, Anytown, USA',
      rental_location_detail: '456 Elm St, Anytown, USA',
      rental_start_date: '2024-02-15',
      start_time: '09:00 AM',
      delivery_location: '123 Main St, Anytown, USA',
      rental_end_date: '2024-02-15',
      customer_name: 'John Doe',
      vehicle: {
        id: 456,
        name: 'Toyota Camry',
        year: 2022,
        price: 50,
        max_passanger: 5,
        max_suitcase: 2,
        plate_number: 'ABC 123 CBA',
        pet_allowed: false,
        disability_allowed: true,
        smoke_allowed: false,
        slash_price: 40,
        price_with_driver: 100,
      },
      rental_location: '456 Elm St, Anytown, USA',
      return_location: '123 Main St, Anytown, USA',
      return_date: '2024-02-15',
      return_time: '06:00 PM',
      id: 789,
      order_key: 'O987654',
      order_status: 'CONFIRMED',
      user_name: 'johndoe',
      phone_number: '123-456-7890',
      phone_country_code: '+1',
      wa_number: '123-456-7890',
      down_payment: 100,
      deposit: 200,
      booking_price: 50,
      service_fee: 10,
      rental_delivery_fee: 20,
      rental_return_fee: 20,
      insurance_fee: 30,
      total_payment: 430,
      customer_id: 'C789',
      created_at: '2024-02-10T12:34:56',
      updated_at: '2024-02-15T08:00:00',
      expired_time: '2024-02-15T08:00:00',
      refferal_code: 'REF123',
      order_detail: {
        details: 'Some details about the order',
      },
      order_cancelation: null,
      is_extension: false,
      is_order_extension_exists: false,
      is_deposit_exists: true,
      is_admin_creation: false,
    },
    courier_id: 789,
    string: 'Some additional string data',
    image_captures: null,
    note: 'Some notes about the task',

    title: 'Some,',
    created_at: '2024-02-15T08:00:00',
  },
];

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
