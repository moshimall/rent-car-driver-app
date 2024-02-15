import Button from 'components/Button';
import React from 'react';
import {h1} from 'utils/styles';
import {ic_calendar, ic_park, ic_pinpoin} from 'assets/icons';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {Image, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';
import {useNavigation} from '@react-navigation/native';
import {WithDriverTaskDetailData} from 'screens/TaskListDetailByStatusScreen/hooks/useTaskListDetailByStatus';
import {ITypeTask} from 'types/navigator';
import { WithoutDriverTaskDetail } from 'types/tasks.types';

type TaskDetailByStatusCardProps = {
  id: number;
  item: WithDriverTaskDetailData;
  type: ITypeTask;
};

const TaskDetailByStatusCard = ({
  item,
  id,
  type,
}: TaskDetailByStatusCardProps) => {
  const navigation = useNavigation();

  const title =
    type === 'Dengan Supir'
      ? item.item_title
      : type === 'Tanpa Supir'
      ? item.title
      : '-';

  const handleTask = () => {
    if (type === 'Dengan Supir') {
      if (item.item_status === 'RETURN_TO_GARAGE') {
        navigation.navigate('TaskDetailParkirMobil', {id, item});
      }
  
      if (item.item_status === 'TAKE_FROM_GARAGE') {
        navigation.navigate('TaskDetailAmbilMobilDariGarasi', {id, item});
      }
    }

    if (type === 'Tanpa Supir') {
      if (item.status === 'RETURN_TO_GARAGE') {
        navigation.navigate('TaskDetailParkirMobil', {id, item});
      }

      if (item.status === 'TAKE_CAR') {
        navigation.navigate('TaskDetailAmbilMobil', {id, item});
      }

      if (item.status === 'TAKE_CAR') {
        navigation.navigate('TaskDetailAntarMobil', {id, item});
      }
  
      if (item.status === 'TAKE_FROM_GARAGE') {
        navigation.navigate('TaskDetailAmbilMobilDariGarasi', {id, item});
      }
    }
  };

  return (
    <View style={[styles.cardWrapper]}>
      <View style={[rowCenter]}>
        <Image
          source={ic_park}
          style={iconCustomSize(25)}
          resizeMode="stretch"
        />
        <Text style={[h1, {marginLeft: 5, color: theme.colors.navy}]}>
          {title}
        </Text>
      </View>
      <View style={styles.lineHorizontal} />
      <Text style={h1}>{item?.order?.customer_name}</Text>
      <Text style={styles.textOrderId}>
        Order ID:{' '}
        <Text style={{fontWeight: '500'}}>
          {item?.order?.order_key} | {item?.order?.vehicle?.name || '-'}
        </Text>
      </Text>

      <View style={{marginTop: 20}}>
        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Lokasi Pengantaran</Text>
            <Text style={styles.textLocation}>
              {item?.order?.delivery_location || '-'}
            </Text>
          </View>
        </View>

        <View style={styles.lineVertical} />

        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Lokasi Pengembalian</Text>
            <Text style={styles.textLocation}>
              {item?.order?.return_location}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.lineHorizontal} />

      <View style={{marginTop: 0}}>
        <View style={rowCenter}>
          <Image source={ic_calendar} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Tanggal Selesai</Text>
            <Text style={styles.textLocation}>
              {item?.order?.return_date} | {item?.order?.return_time}
            </Text>
          </View>
        </View>
      </View>

      <Button
        _theme="navy"
        title={title}
        onPress={handleTask}
        styleWrapper={{
          width: '100%',
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />
    </View>
  );
};

export default TaskDetailByStatusCard;

const styles = StyleSheet.create({
  textOrderId: {fontSize: 12, fontWeight: 'bold', color: theme.colors.black},
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
    width: '100%',
    alignSelf: 'center',
    marginVertical: 20,
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
});
