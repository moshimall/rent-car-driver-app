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
import {updateCourirTasks} from 'store/effects/taskStore';
import {RootStackParamList} from 'types/navigator';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetailParkirMobil'>;

const TaskDetailAmbilMobilScreen = () => {
  const {item} = useRoute<ScreenRouteProp>().params;
  const navigation = useNavigation();
  const [bulkImage, setBulkImage] = useState([]);
  const [note, setNote] = useState('');

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
              Kembalikan ke Garasi
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const handleSubmit = async () => {
    if (bulkImage?.length <= 0) {
      Alert.alert('PERINGATAN', 'silahkan upload foto pengantaran');
      return;
    }
    let res = await updateCourirTasks({
      id: item?.id,
      image_captures: [...bulkImage],
      status: 'IN_GARAGE',
      note: note,
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
      <View style={{marginHorizontal: 20}}>
        <UploadImageInput
          label="Upload Foto Pengantaran"
          onCameraChange={res => {
            console.log('ress = ', res);
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
          bulkImage={bulkImage}
          setBulkImage={setBulkImage}
          selectedImageLabel=""
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
          value={note}
          onChangeText={v => setNote(v)}
        />
        <Button
          title="Selesaikan Tugas"
          onPress={() => {
            Alert.alert(
              'Konfirmasi Parkir Mobil',
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

export default hoc(TaskDetailAmbilMobilScreen);

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
