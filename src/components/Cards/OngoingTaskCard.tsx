import Button from 'components/Button';
import React from 'react';
import {h1} from 'utils/styles';
import {ic_calendar, ic_park, ic_pinpoin} from 'assets/icons';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ITypeTask} from 'types/navigator';
import {theme} from 'utils';
import {useNavigation} from '@react-navigation/native';
import {WithDriverTaskDetail} from 'types/tasks.types';

type TaskDetailByStatusCardProps = {
  id: number;
  item: WithDriverTaskDetail;
  type: ITypeTask;
};

const OngoingTaskCard = ({
  item,
  id,
  type,
}: TaskDetailByStatusCardProps) => {
  const navigation = useNavigation<any>();

  const handleTask = () => {
    navigation.navigate('TaskListDetailByStatus', {
      type,
      id,
      item,
      can_be_processed: true,
    })
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
          {item?.title}
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
            <Text style={styles.textTitle}>Lokasi Penyewaan</Text>
            <Text style={styles.textLocation}>
              {item?.order?.rental_location || '-'}
            </Text>
          </View>
        </View>

        <View style={styles.lineVertical} />

        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Lokasi Pengembalian</Text>
            <Text style={styles.textLocation}>
              {item?.order?.return_location || '-'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.lineHorizontal} />

      <View style={rowCenter}>
        <Image source={ic_calendar} style={iconCustomSize(45)} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.textTitle}>Tanggal Mulai</Text>
          <Text style={styles.textLocation}>
            {item?.order?.rental_start_date} | {item?.order?.rental_start_time}
          </Text>
        </View>
      </View>

      <View style={[rowCenter, {marginTop: 20}]}>
        <Image source={ic_calendar} style={iconCustomSize(45)} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.textTitle}>Tanggal Selesai</Text>
          <Text style={styles.textLocation}>
            {item?.order?.return_date} | {item?.order?.return_time}
          </Text>
        </View>
      </View>

      <Button
        _theme="navy"
        title="Lihat Detail"
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

export default OngoingTaskCard;

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
