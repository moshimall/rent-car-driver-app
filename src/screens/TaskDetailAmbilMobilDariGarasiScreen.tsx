import appBar from 'components/AppBar/AppBar';
import BottomSheet, {BottomSheetModal} from '@gorhom/bottom-sheet';
import Button from 'components/Button';
import Config from 'react-native-config';
import CustomBackdrop from 'components/CustomBackdrop';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import CustomTextInput from 'components/TextInput';
import hoc from 'components/hoc';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import UploadImageInput from 'components/TaskScreenComponent/UploadImageInput/UploadImageInput';
import {deepClone, theme} from 'utils';
import {h1, h4} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {showToast} from 'utils/Toast';
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
import {
  IParamUPdateCourirTasks,
  updateCourirTasks,
} from 'store/effects/taskStore';

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
  const {item, task_id, type} = useRoute<ScreenRouteProp>().params;
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

    if (type === 'Dengan Supir') {
      params['date'] = item.date;
    }
    
    const res = await updateCourirTasks(params);
    if (res) {
      showToast({
        title: 'Berhasil',
        type: 'success',
        message: 'Berhasil Menyelesaikan Tugas',
      });
      navigation.goBack();
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{marginHorizontal: 20, paddingTop: 20}}>
          {type === 'Dengan Supir' && (
            <>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>Nama</Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.customer_name}
                  </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>No Handphone</Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.phone_number}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.unhighlightedText}>Jumlah Penumpang</Text>
                <Text style={styles.highlightedText}>6</Text>
              </View>
              <View style={styles.solidLine} />
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>No. Order</Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.order_key}
                  </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>Jumlah Kursi</Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.vehicle?.max_suitcase} Kursi
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>Mobil</Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.vehicle?.name}
                  </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>Plat Nomor</Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.vehicle?.plate_number}
                  </Text>
                </View>
              </View>
              <View style={styles.solidLine} />
              <CustomCarousel
                data={
                  item?.order?.vehicle?.photos?.map(data => ({
                    url: `${Config.URL_IMAGE}${data}`,
                  })) || []
                }
                renderItem={({item, index}) => (
                  <View
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={{uri: item?.url}}
                      style={{height: 280, width: WINDOW_WIDTH / 1.1}}
                    />
                  </View>
                )}
                containerStyle={{
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 20,
                }}
                paginationColor="#F1A33A"
                paginationPosition={10}
              />
              <View style={styles.solidLine} />
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>
                    Lokasi Pengantaran
                  </Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.delivery_location}
                  </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text style={styles.unhighlightedText}>Lokasi Penyewaan</Text>
                  <Text style={styles.highlightedText}>
                    {item?.order?.rental_location}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.unhighlightedText}>
                  Lokasi Pengembalian
                </Text>
                <Text style={styles.highlightedText}>
                  {item?.order?.return_location}
                </Text>
              </View>
              <View style={styles.solidLine} />
              <View style={{marginTop: 20}}>
                <Text style={styles.unhighlightedText}>Tanggal Mulai</Text>
                <Text style={styles.highlightedText}>
                  {moment(item?.order?.rental_start_date).format('DD MMM YYYY')}{' '}
                  |{' '}
                  {moment(
                    `${item?.order?.rental_start_date} ${item?.order?.rental_start_time}`,
                  ).format('HH:mm A')}
                </Text>
              </View>
              <View>
                <Text style={styles.unhighlightedText}>Tanggal Selesai</Text>
                <Text style={styles.highlightedText}>
                  {moment(item?.order?.rental_end_date).format('DD MMM YYYY')} |{' '}
                  {moment(
                    `${item?.order?.rental_start_date} ${item?.order?.return_time}`,
                  ).format('HH:mm A')}
                </Text>
              </View>
              <View style={styles.solidLine} />
            </>
          )}

          <UploadImageInput
            label="Upload Foto Mobil"
            onCameraChange={res => {
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
        index={-1}
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

export default hoc(
  TaskDetailAmbilMobilDariGarasiScreen,
  theme.colors.navy,
  false,
  'light-content',
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
    color: '#000000',
  },
  solidLine: {
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
  },
  highlightedText: {
    flexBasis: '50%',
    color: theme.colors.black,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '700',
    marginBottom: 18,
  },
  unhighlightedText: {
    flexBasis: '50%',
    color: theme.colors.black,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
});
