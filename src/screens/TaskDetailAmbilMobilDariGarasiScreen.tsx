import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {h1, h4} from 'utils/styles';
import {
  ic_arrow_left_white,
  ic_checkblue,
  ic_close,
  ic_pinpoin,
} from 'assets/icons';
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
import {WINDOW_WIDTH, iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {img_car_1, img_car_2, img_ktp, img_license} from 'assets/images';
import UploadImageInput from 'components/TaskScreenComponent/UploadImageInput/UploadImageInput';
import Button from 'components/Button';
import {showToast} from 'utils/Toast';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import {deepClone, theme} from 'utils';
import BottomSheet, {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomTextInput from 'components/TextInput';
import {currencyFormat} from 'utils/currencyFormat';
import CustomBackdrop from 'components/CustomBackdrop';
import {IParamUPdateCourirTasks, updateCourirTasks} from 'store/effects/taskStore';
import {RootStackParamList} from 'types/navigator';

interface Denda {
  keterangan: string;
  jumlah: string;
}
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  'TaskDetailAmbilMobilDariGarasi'
>;

const TaskDetailAmbilMobilDariGarasiScreen = () => {
  const navigation = useNavigation();
  const {item, task_id} = useRoute<ScreenRouteProp>().params;

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [bulkImage, setBulkImage] = useState([]);
  const [note, setNote] = useState('');

  const [denda, setDenda] = useState<Denda[]>([]);
  const [tempDenda, setTempDenda] = useState<Denda>({
    keterangan: '',
    jumlah: '',
  });

  // variables
  const snapPoints = useMemo(() => ['80%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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
              Ambil Dari Garasi
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const handleSubmit = async () => {
    if (bulkImage?.length <= 0) {
      Alert.alert('PERINGATAN', 'silahkan upload foto mobil');
      return;
    }
    const params: IParamUPdateCourirTasks = {
      id: task_id,
      image_captures: [...bulkImage],
      status: 'TAKE_FROM_GARAGE',
      note: note,
    };

    console.log('params', params);
    let res = await updateCourirTasks(params);

    if (!res) {
      showToast({
        title: 'Terjadi Kesalahan',
        type: 'error',
        message: 'Terjadi Kesalahan, silahkan hubungi Admin.',
      });
      return;
    }
    console.log('ress sukses TAKE_FROM_GARAGE = ', res);
    showToast({
      title: 'Berhasil',
      type: 'success',
      message: 'Berhasil Menyelesaikan Tugas',
    });
    navigation.goBack();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{marginHorizontal: 20}}>
          <UploadImageInput
            label="Upload Foto Mobil"
            onCameraChange={res => {
              // console.log('ress = ', res);
              let _: any = [];
              res?.map(x => {
                _.push(`data:${x?.type};base64,${x?.base64}`);
              });
              setBulkImage(_);
              // showToast({
              //   title: 'Berhasil',
              //   type: 'success',
              //   message: 'Berhasil Upload Foto',
              // });
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

          <Text style={[h4, styles.text, {marginVertical: 10}]}>
            Keterangan
          </Text>

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
            title="Konfirmasi Ambil Dari Garasi"
            onPress={() => {
              Alert.alert(
                'Konfirmasi Ambil Mobil',
                'Apakah anda yakin menyelesaikan Tugas Ambil Dari Garasi?',
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
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        containerStyle={
          {
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }
        // in
        index={-1}
        // backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
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
          <Text style={[h1, {fontSize: 20}]}>Tambah Denda</Text>
          <CustomTextInput
            title="Keterangan Denda"
            placeholder="Masukan keterangan denda"
            value={tempDenda.keterangan}
            onChangeText={v => setTempDenda({...tempDenda, keterangan: v})}
          />
          <View style={{marginVertical: 10}} />
          <CustomTextInput
            title="Jumlah Denda"
            placeholder="Masukan jumlah denda"
            keyboardType="numeric"
            value={tempDenda.jumlah}
            onChangeText={v => setTempDenda({...tempDenda, jumlah: v})}
          />

          <Button
            _theme="navy"
            title="Konfirmasi"
            styleWrapper={{marginTop: 20}}
            onPress={() => {
              if (!tempDenda.jumlah || !tempDenda.keterangan) {
                showToast({
                  type: 'warning',
                  message: 'semua form harus diisi',
                  title: 'warning',
                });
                return;
              }
              let _ = deepClone(denda);
              _.push(tempDenda);
              setDenda(_);
              bottomSheetRef?.current?.close();
              setTempDenda({
                keterangan: '',
                jumlah: '',
              });
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default hoc(TaskDetailAmbilMobilDariGarasiScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
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
  btnDenda: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.colors.navy,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
    // alignItems: 'center',
  },
});