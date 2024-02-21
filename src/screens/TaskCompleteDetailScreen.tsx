import appBar from 'components/AppBar/AppBar';
import CollapseItem from 'components/CollapseItem/CollapseItem';
import hoc from 'components/hoc';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {getNotes, getTaskById} from 'store/effects/taskStore';
import {h1, h4} from 'utils/styles';
import {ic_arrow_left_white, ic_pinpoin} from 'assets/icons';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {theme} from 'utils';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskCompleteDetail'>;

type IStatus = 'PICKUP_PROCESS' | 'RETURNED' | 'IN_GARAGE';
interface TaskId {
  image_captures: {
    file_name: string;
    for_task_status: IStatus;
  }[];
  id: number;
  note: string;
  status: IStatus;
}
interface Notes {
  status: IStatus;
  note: string;
}
const TaskCompleteDetailScreen = () => {
  const {item, vehicleId} = useRoute<ScreenRouteProp>().params;

  const navigation = useNavigation();
  const [taskId, setTaskId] = useState<TaskId>();
  const [notes, setNotes] = useState<Notes[]>([]);

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
              Detail Tugas
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const taskDetails = await getTaskById(item?.id);
      setTaskId(taskDetails);

      const taskNotes = await getNotes(item?.id);
      setNotes(taskNotes);
    };

    fetchData();

    return () => {};
  }, [item, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>No. Order</Text>
          <Text style={styles.boldText}>{item?.order?.order_key}</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Tanggal Penyelesaian Tugas</Text>
          <Text style={styles.boldText}>
            {moment(item?.order?.order_detail?.end_booking_date).format(
              'DD MMMM YYYY',
            )}{' '}
            {item?.order?.order_detail?.end_booking_time}
          </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Nama</Text>
          <Text style={styles.boldText}>{item?.order?.user_name}</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>No Handphone</Text>
          <Text style={styles.boldText}>{item?.order?.wa_number}</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Mobil</Text>
          <Text style={styles.boldText}>
            {vehicleId?.brand_name} {vehicleId?.name}
          </Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Status Pengantaran</Text>
          <Text style={styles.boldText}>{item?.order?.order_status}</Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Jumlah Kursi</Text>
          <Text style={styles.boldText}>{vehicleId?.max_suitcase} kursi</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Plat Nomor</Text>
          <Text style={styles.boldText}>{vehicleId?.license_number}</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={{padding: '5%'}}>
        <Text style={[h4, styles.text]}>Lokasi Pengantaran</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h4, styles.text]}>
            {item?.order?.order_detail?.rental_delivery_location}
          </Text>
        </View>
      </View>

      <View style={{padding: '5%', paddingTop: 10}}>
        <Text style={[h4, styles.text]}>Detail Lokasi</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h4, styles.text]}>
            {item?.order?.order_detail?.rental_delivery_location_detail}
          </Text>
        </View>
      </View>
      <View style={[styles.solidLine, {marginHorizontal: '5%'}]} />

      <View style={{padding: '5%'}}>
        <Text style={[h4, styles.text]}>Lokasi Pengembalian</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h4, styles.text]}>
            {item?.order?.order_detail?.rental_return_location}
          </Text>
        </View>
      </View>
      <View style={{padding: '5%', paddingTop: 10}}>
        <Text style={[h4, styles.text]}>Detail Lokasi</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h4, styles.text]}>
            {item?.order?.order_detail?.rental_return_location_detail}
          </Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={{marginTop: 20}} />
      <CollapseItem
        title={'Data Pengantaran'}
        children={
          <>
            <View style={{marginTop: 20}}>
              <Text style={[[h4, styles.text], {marginBottom: 5}]}>
                Tanggal Pengantaran
              </Text>
              <Text style={styles.boldText}>
                {moment(item?.order?.order_detail?.end_booking_date)?.format(
                  'DD MMMM YYYY',
                )}{' '}
                | {item?.order?.order_detail?.end_booking_time}
              </Text>
            </View>

            <Text style={[[h4, styles.text], {marginVertical: 10}]}>
              Foto Pengantaran
            </Text>
            <View style={[rowCenter]}>
              {taskId?.image_captures
                ?.filter(x => x?.for_task_status === 'PICKUP_PROCESS')
                .map((x, i) => (
                  <Image
                    key={i}
                    source={{uri: x?.file_name}}
                    style={[
                      iconCustomSize(58),
                      {borderRadius: 10, marginRight: 10},
                    ]}
                  />
                ))}
            </View>

            <Text style={[[h4, styles.text], {marginTop: 10}]}>Keterangan</Text>

            <TextInput
              style={styles.textArea}
              editable={false}
              value={notes.find(x => x?.status === 'PICKUP_PROCESS')?.note}
            />
          </>
        }
      />

      <CollapseItem
        title={'Data Pengambilan'}
        children={
          <>
            <View>
              <Text
                style={[[h4, styles.text], {marginBottom: 5, marginTop: 20}]}>
                Tanggal Pengembalian
              </Text>
              <Text style={styles.boldText}>
                {moment(item?.order?.order_detail?.end_booking_date)?.format(
                  'DD MMMM YYYY',
                )}{' '}
                | {item?.order?.order_detail?.end_booking_time}
              </Text>
            </View>

            <Text style={[[h4, styles.text], {marginVertical: 10}]}>
              Foto Pengantaran
            </Text>
            <View style={[rowCenter]}>
              {taskId?.image_captures
                ?.filter(x => x?.for_task_status === 'RETURNED')
                .map((x, i) => (
                  <Image
                    key={i}
                    source={{uri: x?.file_name}}
                    style={[
                      iconCustomSize(58),
                      {borderRadius: 10, marginRight: 10},
                    ]}
                  />
                ))}
            </View>

            <Text style={[[h4, styles.text], {marginTop: 10}]}>Keterangan</Text>

            <TextInput
              style={styles.textArea}
              editable={false}
              value={notes.find(x => x?.status === 'RETURNED')?.note}
            />
            <Text style={[[h4, styles.text], {marginBottom: 5, marginTop: 20}]}>
              Detail Denda
            </Text>

            <View style={styles.boxDenda}>
              <Text style={[h4, {color: theme.colors.grey5}]}>
                Tidak ada denda
              </Text>
            </View>
          </>
        }
      />

      <CollapseItem
        title={'Data Pengembalian ke Garasi'}
        children={
          <>
            <View style={{marginTop: 20}}>
              <Text style={[[h4, styles.text], {marginBottom: 5}]}>
                Tanggal Pengantaran
              </Text>
              <Text style={styles.boldText}>
                {moment(item?.order?.order_detail?.end_booking_date)?.format(
                  'DD MMMM YYYY',
                )}{' '}
                | {item?.order?.order_detail?.end_booking_time}
              </Text>
            </View>

            <Text style={[[h4, styles.text], {marginVertical: 10}]}>
              Foto Pengantaran
            </Text>
            <View style={[rowCenter]}>
              {taskId?.image_captures
                ?.filter(x => x?.for_task_status === 'IN_GARAGE')
                .map((x, i) => (
                  <Image
                    key={i}
                    source={{uri: x?.file_name}}
                    style={[
                      iconCustomSize(58),
                      {borderRadius: 10, marginRight: 10},
                    ]}
                  />
                ))}
            </View>

            <Text style={[[h4, styles.text], {marginTop: 10}]}>Keterangan</Text>

            <TextInput
              style={styles.textArea}
              editable={false}
              value={notes.find(x => x?.status === 'IN_GARAGE')?.note}
            />
          </>
        }
      />

      <View style={styles.dashedLine} />
    </ScrollView>
  );
};

export default hoc(TaskCompleteDetailScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  descriptionContainer: {
    padding: '5%',
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    color: '#000000',
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  dashedLine: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  solidLine: {
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
  },
  roundedImage: {
    borderRadius: 100,
    width: 48,
    height: 48,
    backgroundColor: 'red',
    overflow: 'hidden',
    marginRight: 10,
  },
  imgCar: {
    width: 48,
    height: 48,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '100%',
    height: 86,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {width: '100%', height: '100%', borderRadius: 5},
  boxWrapper: {
    padding: '5%',
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    margin: 20,
    borderRadius: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#6666',
    borderRadius: 6,
    height: 100,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  boxDenda: {
    backgroundColor: theme.colors.grey8,
    height: 100,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
