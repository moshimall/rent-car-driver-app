import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {h1, h4, h5} from 'utils/styles';
import {
  ic_arrow_left_white,
  ic_checkblue,
  ic_close,
  ic_pinpoin,
  ic_plus,
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
import {updateCourirTasks} from 'store/effects/taskStore';
import {RootStackParamList} from 'types/navigator';

interface Denda {
  keterangan: string;
  jumlah: string;
}
type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetailAmbilMobil'>;

const TaskDetailAmbilMobilScreen = () => {
  const navigation = useNavigation();
  const {item} = useRoute<ScreenRouteProp>().params;

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
              Ambil Mobil
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
      id: item?.task_id,
      image_captures: [...bulkImage],
      status: 'TAKE_CAR',
      note: note,
      violations: denda?.map(x => ({
        violation: x?.keterangan,
        cost: JSON.parse(x.jumlah || 0) as any,
      })),
    });

    if (!res) {
      showToast({
        title: 'Terjadi Kesalahan',
        type: 'error',
        message: 'Terjadi Kesalahan, silahkan hubungi Admin.',
      });
      return;
    }
    console.log('ress sukses ambil = ', res);
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
            bulkImage={bulkImage}
            setBulkImage={setBulkImage}
            selectedImageLabel=""
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

          <View style={styles.infoWrapper}>
            <Text style={[h1]}>Informasi Penting</Text>
            <Text style={[h4, {lineHeight: 24, fontSize: 12}]}>
              Jika customer memiliki denda lebih besar dari pada jumlah deposit
              yang tercantum, maka customer wajib melunasi biaya tersebut ke
              rekening{' '}
              <Text style={[h1, {fontSize: 12}]}>
                221134566788 a/n Get&Ride
              </Text>{' '}
              di sertakan bukti transfer
            </Text>
          </View>

          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginTop: 10},
            ]}>
            <Text style={[h4, styles.text, {marginVertical: 10}]}>
              Detail Denda
            </Text>

            <TouchableOpacity
              style={[rowCenter]}
              onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
              <Image source={ic_plus} style={[iconCustomSize(15)]} />
              <Text style={[h4, {fontSize: 12, marginLeft: 5}]}>
                Tambah Denda
              </Text>
            </TouchableOpacity>
          </View>

          {denda.length <= 0 ? (
            <View
              style={{
                backgroundColor: '#F4F4F4',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}>
              <Text style={{fontSize: 11, color: '#A8A8A8'}}>
                Tidak ada denda
              </Text>
            </View>
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderColor: '#A8A8A8',
                padding: 10,
                borderRadius: 10,
              }}>
              {[
                ...denda,
                {
                  keterangan: 'Total',
                  jumlah: denda.reduce((accumulator, v) => {
                    return accumulator + parseInt(v.jumlah);
                  }, 0),
                },
              ].map((x, i) => (
                <View key={`index_${i}`}>
                  {denda.length === i && (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#A8A8A8',
                        marginBottom: 10,
                      }}
                    />
                  )}
                  <View
                    style={[
                      rowCenter,
                      {justifyContent: 'space-between', marginBottom: 10},
                    ]}>
                    <Text style={{width: '60%'}}>{x.keterangan}</Text>

                    <View style={[rowCenter]}>
                      <Text>{currencyFormat(parseInt(x.jumlah as any))}</Text>
                      {denda.length !== i ? (
                        <TouchableOpacity
                          onPress={() => {
                            let array = deepClone(denda);
                            // let index = 2;

                            array.splice(i, 1);
                            setDenda(array);
                          }}>
                          <Image
                            source={ic_close}
                            style={[iconCustomSize(8), {marginLeft: 5}]}
                          />
                        </TouchableOpacity>
                      ) : (
                        <View style={{width: 13}} />
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={[styles.solidLine, {marginTop: 20}]} />

          <Text style={[h4, {fontSize: 12, marginVertical: 10}]}>
            Keterangan Deposit
          </Text>

          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h4, {fontSize: 12}]}>Deposit</Text>
            <Text style={[h4, {fontSize: 12}]}>IDR 500.000</Text>
          </View>

          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h4, {fontSize: 12}]}>Deposit e-toll</Text>
            <Text style={[h4, {fontSize: 12}]}>IDR 175.000</Text>
          </View>

          <View style={[styles.solidLine, {marginVertical: 10}]} />
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h4, {fontSize: 12}]}>Kurang Bayar</Text>
            <Text style={[h4, {fontSize: 12}]}>IDR 0</Text>
          </View>
          <View style={[styles.solidLine, {marginVertical: 10}]} />

          <UploadImageInput
            label="Upload Bukti Transfer"
            onCameraChange={res => {
              // console.log('ress = ', res);
              let _: any = [];
              res?.map(x => {
                _.push(`data:${x?.type};base64,${x?.base64}`);
              });
              // setBulkImage(_);
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
              // setBulkImage(_);
            }}
            // bulkImage={bulkImage}
            // setBulkImage={setBulkImage}
            // selectedImageLabel=""
          />

          <Button
            title="Selesaikan Tugas"
            onPress={() => {
              Alert.alert(
                'Konfirmasi Ambil Mobil',
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

export default hoc(TaskDetailAmbilMobilScreen);

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
  infoWrapper: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#E7F3FF',
    borderWidth: 1,
    borderColor: theme.colors.navy,
    marginTop: 20,
  },
});