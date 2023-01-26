import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useEffect} from 'react';
import {h1, h4} from 'utils/styles';
import {ic_arrow_left_white, ic_pinpoin} from 'assets/icons';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {iconSize, rowCenter} from 'utils/mixins';
import {useNavigation} from '@react-navigation/native';
import {img_car_2, img_ktp, img_license} from 'assets/images';
import UploadImageInput from 'components/TaskScreenComponent/UploadImageInput/UploadImageInput';
import Button from 'components/Button';
import {showToast} from 'utils/Toast';

const TaskDetailScreen = () => {
  const navigation = useNavigation();

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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>Detail</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Nama</Text>
          <Text style={styles.boldText}>Kevin Sanjaya</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>No Handphone</Text>
          <Text style={styles.boldText}>081234567890</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>No. Order</Text>
          <Text style={styles.boldText}>12N34567</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Metode Pembayaran</Text>
          <Text style={styles.boldText}>Card Payment</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '60%', flexDirection: 'row'}}>
          <View style={styles.roundedImage}>
            <Image
              source={img_car_2}
              style={styles.imgCar}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text style={[h4, styles.text]}>Mobil</Text>
            <Text style={styles.boldText}>Suzuki Ertiga</Text>
          </View>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Jumlah Kursi</Text>
          <Text style={styles.boldText}>4 Kursi</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Total Pembayaran</Text>
          <Text style={styles.boldText}>IDR 607.000</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={[h4, styles.text]}>Status Pembayaran</Text>
          <Text style={styles.boldText}>Success</Text>
        </View>
      </View>
      <View style={styles.solidLine} />

      <View style={{padding: '5%'}}>
        <Text style={[h4, styles.text]}>Lokasi Pengantaran</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h4, styles.text]}>Cafe Bali</Text>
        </View>
      </View>
      <View style={[styles.solidLine, {marginHorizontal: '5%'}]} />

      <View style={{padding: '5%'}}>
        <Text style={[h4, styles.text]}>Lokasi Pengembalian</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={[h4, styles.text]}>Cafe Bali</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={{padding: '5%'}}>
        <View style={{marginBottom: 20}}>
          <Text style={[[h4, styles.text], {marginBottom: 5}]}>Mulai Sewa</Text>
          <Text style={styles.boldText}>01 Juli 2022 | 09:00 AM</Text>
        </View>

        <View>
          <Text style={[[h4, styles.text], {marginBottom: 5}]}>
            Tanggal Pengembalian
          </Text>
          <Text style={styles.boldText}>03 Juli 2022 | 09:00 AM</Text>
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
                source={img_license}
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
              <Image source={img_ktp} style={styles.image} resizeMode="cover" />
            </View>
          </View>
        </View>

        <UploadImageInput
          label="Upload Foto Pengantaran"
          onCameraChange={res => {
            showToast({
              title: 'Berhasil',
              type: 'success',
              message: 'Berhasil Upload Foto',
            });
          }}
          onDelete={() => {}}
          selectedImageLabel=""
        />

        <Button
          title="Selesaikan Tugas"
          onPress={() => {
            Alert.alert(
              'Selesaikan Pesanan',
              'Apakah anda yakin menyelesaikan Tugas?',
              [
                {
                  text: 'Tidak',
                  onPress(value) {},
                },
                {
                  text: 'Ya',
                  onPress(value) {
                    showToast({
                      title: 'Berhasil',
                      type: 'success',
                      message: 'Berhasil Menyelesaikan Tugas',
                    });
                    navigation.goBack();
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

export default hoc(TaskDetailScreen);

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
