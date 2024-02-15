import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useEffect, useState} from 'react';
import {h1, h4} from 'utils/styles';
import {ic_arrow_left_white, ic_pinpoin} from 'assets/icons';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {WINDOW_WIDTH, iconSize, rowCenter} from 'utils/mixins';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {img_car_1, img_car_2, img_ktp, img_license} from 'assets/images';
import UploadImageInput from 'components/TaskScreenComponent/UploadImageInput/UploadImageInput';
import Button from 'components/Button';
import {showToast} from 'utils/Toast';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import {deepClone} from 'utils';
import {RootStackParamList} from 'types/navigator';
import moment from 'moment';
import {currencyFormat} from 'utils/currencyFormat';
import {getTaskById, updateCourirTasks} from 'store/effects/taskStore';
import {URL_IMAGE} from '@env';
import {getUserById} from 'store/effects/authStore';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetailAntarMobil'>;

const TaskDetailAntarMobil = () => {
  const {item, task_id} = useRoute<ScreenRouteProp>().params;

  const navigation = useNavigation();
  const [bulkImage, setBulkImage] = useState([]);


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
              Antar Mobil
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
    // _getUser();
    // _getTaskById();
  }, [navigation]);


  const handleSubmit = async () => {
    if (bulkImage?.length <= 0) {
      Alert.alert('PERINGATAN', 'silahkan upload foto pengantaran');
      return;
    }
    let res = await updateCourirTasks({
      id: item?.task_id,
      image_captures: [...bulkImage],
      status: 'DELIVERY_CAR',
    });
    if (!res) {
      showToast({
        title: 'Terjadi Kesalahan',
        type: 'error',
        message: 'Terjadi Kesalahan, silahkan hubungi Admin.',
      });
      return;
    }

    console.log('ress sukses anter = ', res);
    showToast({
      title: 'Berhasil',
      type: 'success',
      message: 'Berhasil Menyelesaikan Tugas',
    });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.descriptionContainer}>
        <View style={{}}>
          <Text style={[h4, styles.text]}>Nama</Text>
          <Text style={styles.boldText}>{item?.order?.customer_name}</Text>
        </View>

        <View style={{flexBasis: '33%'}}>
          <Text style={[h4, styles.text]}>No Handphone</Text>
          <Text style={styles.boldText}>{item?.order?.phone_number}</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{}}>
          <Text style={[h4, styles.text]}>No. Order</Text>
          <Text style={styles.boldText}>{item?.order?.order_key}</Text>
        </View>

        <View style={{flexBasis: '33%'}}>
          <Text style={[h4, styles.text]}>Jumlah Kursi</Text>
          <Text style={styles.boldText}>
            {item?.order?.vehicle?.max_suitcase} Kursi
          </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View>
          <Text style={[h4, styles.text]}>Mobil</Text>
          <Text style={styles.boldText}>{item?.order?.vehicle?.name}</Text>
        </View>

        <View style={{flexBasis: '33%'}}>
          <Text style={[h4, styles.text]}>Plat Nomor</Text>
          <Text style={styles.boldText}>
            {item?.order?.vehicle?.plate_number}
          </Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{}}>
          <View style={{marginBottom: 10}} />
          <CustomCarousel
            data={[...((item?.order?.vehicle?.photos as any[]) || [])]}
            paginationSize={7}
            paginationPosition={-10}
            // renderCarouselTitle={
            //   <View style={styles.carouselTitleContainer}>
            //     <Text style={{fontWeight: 'bold'}}>
            //       {vehicleById.brand_name} {vehicleById.name}
            //     </Text>
            //   </View>
            // }
            renderItem={({item, index}: any) => (
              <View
                style={
                  {
                    // alignItems: 'center',
                    // alignSelf: 'center',
                  }
                }>
                <Image
                  source={{uri: URL_IMAGE + item}}
                  style={{height: 250, width: '90%'}}
                />
              </View>
            )}
            containerStyle={{
              width: '100%',
              alignItems: 'center',
            }}
          />
        </View>
      </View>
      <View style={styles.dashedLine} />

      {/* <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Total Pembayaran</Text>
          <Text style={styles.boldText}>
            {currencyFormat(taskById?.total_payment)}
          </Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Status Pembayaran</Text>
          <Text style={styles.boldText}>{item?.order?.order_status}</Text>
        </View>
      </View> */}
      <View style={styles.solidLine} />

      <View style={{padding: '5%'}}>
        <Text style={[h4, styles.text]}>Lokasi Pengantaran</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h1, styles.text]}>{item?.order?.rental_location}</Text>
        </View>
      </View>

      <View style={{padding: '5%', paddingTop: 10}}>
        <Text style={[h4, styles.text]}>Detail Lokasi</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          {/* <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} /> */}
          <Text style={[h1, styles.text]}>
            {item?.order?.rental_location_detail}
          </Text>
        </View>
      </View>
      <View style={[styles.solidLine, {marginHorizontal: '5%'}]} />

      <View style={{padding: '5%'}}>
        <Text style={[h4, styles.text]}>Lokasi Pengembalian</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h1, styles.text]}>{item?.order?.return_location}</Text>
        </View>
      </View>
      <View style={{padding: '5%', paddingTop: 10}}>
        <Text style={[h4, styles.text]}>Detail Lokasi</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          {/* <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} /> */}
          <Text style={[h1, styles.text]}>
            {item?.order?.return_location_detail}
          </Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={{padding: '5%'}}>
        <View style={{marginBottom: 20}}>
          <Text style={[[h4, styles.text], {marginBottom: 5}]}>Mulai Sewa</Text>
          <Text style={styles.boldText}>
            {moment(item?.order?.rental_start_date)?.format('DD MMMM YYYY')} |{' '}
            {item?.order?.rental_start_time}
          </Text>
        </View>

        <View>
          <Text style={[[h4, styles.text], {marginBottom: 5}]}>
            Tanggal Pengembalian
          </Text>
          <Text style={styles.boldText}>
            {moment(item?.order?.return_date)?.format('DD MMMM YYYY')} |{' '}
            {item?.order?.return_time}
          </Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={{padding: '5%'}}>
        <View style={styles.profilePictureContainer}>
          <View style={{flexBasis: '48%'}}>
            <Text style={[h4, styles.text, {marginBottom: 10}]}>
              Lihat Foto SIM
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: URL_IMAGE + item?.order?.identity?.sim}}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={{flexBasis: '48%'}}>
            <Text style={[h4, styles.text, {marginBottom: 10}]}>
              Lihat Foto KTP
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: URL_IMAGE + item?.order?.identity?.ktp}}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        <UploadImageInput
          label="Upload Foto"
          onCameraChange={res => {
            // console.log('ress = ', res);
            let _: any = [];
            res?.map(x => {
              _.push(`data:${x?.type};base64,${x?.base64}`);
            });
            setBulkImage(_);
          }}
          onDelete={i => {
            console.log('x = ', i);
            let _ = deepClone(bulkImage);
            _.splice(i, 1);
            setBulkImage(_);
          }}
          // bulkImage={bulkImage}
          // setBulkImage={setBulkImage}
          // selectedImageLabel=""
        />

        <Text style={[h4, styles.text, {marginVertical: 10}]}>Keterangan</Text>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#6666',
            borderRadius: 6,
            height: 100,
            textAlignVertical: 'top',
          }}
          placeholder="Tulis Keterangan.."
        />
        <Button
          title="Selesaikan Tugas"
          onPress={() => {
            Alert.alert(
              'Konfirmasi Antar Mobil',
              'Apakah anda yakin menyelesaikan Tugas?',
              [
                {
                  text: 'Tidak',
                  onPress(value) {},
                },
                {
                  text: 'Ya',
                  onPress(value) {
                    handleSubmit();
                  },
                },
              ],
            );
          }}
          _theme="green"
          styleWrapper={{marginVertical: 20}}
        />
      </View>
    </ScrollView>
  );
};

export default hoc(TaskDetailAntarMobil);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  descriptionContainer: {
    padding: '5%',
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
});
