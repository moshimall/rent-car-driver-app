import Button from 'components/Button';
import {h2} from 'utils/styles';
import {ic_car, ic_check, ic_pinpoin} from 'assets/icons';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {Image, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';
import {useNavigation} from '@react-navigation/native';
import { DataItemTask, Vehicle } from 'types/tasks.types';
import moment from 'moment';
import { useDataStore } from 'store/actions/dataStore';
import { IDataStore } from 'types/data.types';

const MyTaskCard: React.FC<{status: 0 | 1; item: DataItemTask}> = ({status, item}) => {
  const navigation = useNavigation();
  const getData = useDataStore() as IDataStore;
  const vehicleId = (
    getData?.vehicles?.length > 0
      ? getData?.vehicles?.find(
          x => x?.id === item?.order?.order_detail?.vehicle_id,
        )
      : {}
  ) as Vehicle;
  return (
    <View style={[styles.cardWrapper]}>
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', alignItems: 'flex-start'},
        ]}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image
              source={ic_car}
              style={iconCustomSize(20)}
              resizeMode="stretch"
            />
            <Text style={styles.title}>Parkir ke Garasi</Text>
          </View>

          <Text style={styles.time}>{moment(item?.created_at).add(7, 'hour').format('HH MMMM YYYY HH:mm')}</Text>
        </View>

        <View style={[rowCenter, styles.taskDoneWrapper]}>
          <Image source={ic_check} style={iconCustomSize(15)} />
          <Text
            style={[
              h2,
              {color: 'rgba(41, 155, 10, 1)', fontSize: 10, marginLeft: 5},
            ]}>
            Tugas Selesai
          </Text>
        </View>
      </View>

      <View style={styles.lineHorizontal} />
      <Text style={styles.textOrderId}>
        Order ID: <Text style={{ fontWeight: '500' }}>{item?.order?.order_key} | { vehicleId?.name || '-'}</Text>
      </Text>

      <View style={{marginTop: 20}}>
        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Lokasi Pengantaran</Text>
            <Text style={styles.textLocation}>{item?.order?.order_detail?.rental_delivery_location}</Text>
          </View>
        </View>

        <View style={styles.lineVertical} />

        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Lokasi Pengambilan</Text>
            <Text style={styles.textLocation}>{item?.order?.order_detail?.rental_return_location}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lineHorizontal} />

      <View style={{marginTop: 0}}>
        {status === 0 && (
          <View style={rowCenter}>
            <Image source={ic_pinpoin} style={iconCustomSize(45)} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.textTitle}>Mulai Sewa</Text>
              <Text style={styles.textLocation}>01 Juli 2022 | 09:00 AM</Text>
            </View>
          </View>
        )}

        {status === 0 && <View style={styles.lineVertical} />}

        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Tanggal Pengembalian</Text>
            <Text style={styles.textLocation}>{item?.order?.order_detail?.end_booking_date} | {item?.order?.order_detail?.end_booking_time}</Text>
          </View>
        </View>
      </View>

      {/* <Text style={styles.textComment}>Comment : </Text> */}

      <Button
        _theme="navy"
        title="Detail Tugas"
        onPress={() => {
          navigation.navigate('TaskCompleteDetail', {item: item, vehicleId: vehicleId});
        }}
        styleWrapper={{
          width: '95%',
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />
    </View>
  );
};

export default MyTaskCard;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    marginVertical: 10,
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
  title: {
    color: theme.colors.navy,
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '700',
    marginLeft: 15,
  },
  time: {
    color: '#A8A8A8',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
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
    height: 21,
    width: 1,
    marginLeft: 20,
    marginVertical: 7,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  lineHorizontal: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 20,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  textComment: {
    color: '#A8A8A8',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 20,
  },
  taskDoneWrapper: {
    backgroundColor: 'rgba(227, 255, 232, 1)',
    padding: 10,
    borderRadius: 40,
  },
});
