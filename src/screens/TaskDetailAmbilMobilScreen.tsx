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
import {useNavigation} from '@react-navigation/native';
import {img_car_1, img_car_2, img_ktp, img_license} from 'assets/images';
import UploadImageInput from 'components/TaskScreenComponent/UploadImageInput/UploadImageInput';
import Button from 'components/Button';
import {showToast} from 'utils/Toast';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import {deepClone, theme} from 'utils';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomTextInput from 'components/TextInput';
import {currencyFormat} from 'utils/currencyFormat';

interface Denda {
  keterangan: string;
  jumlah: string;
}
const TaskDetailAmbilMobilScreen = () => {
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{marginHorizontal: 20}}>
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

        <Text style={[h4, styles.text, {marginVertical: 10}]}>
          Detail Denda
        </Text>

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
              <View>
                {(denda.length) === i && <View style={{borderBottomWidth: 1, borderBottomColor: '#A8A8A8', marginBottom: 10}} />}
                <View style={[rowCenter, {justifyContent: 'space-between', marginBottom: 10}]}>
                  <Text>{x.keterangan}</Text>

                  <View style={[rowCenter]}>
                    <Text>{currencyFormat(parseInt(x.jumlah))}</Text>
                    {denda.length !== i  ? <TouchableOpacity onPress={()=> {
                      let array = deepClone(denda);
                      // let index = 2;
                      
                      array.splice(i, 1);
                      setDenda(array);
                    }}>
                      <Image
                        source={ic_close}
                        style={[iconCustomSize(8), {marginLeft: 5}]}
                      />
                    </TouchableOpacity>: <View style={{ width: 13}} />}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.btnDenda}
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
          <Text style={{fontWeight: 'bold', color: theme.colors.navy}}>
            Tambah Denda
          </Text>
        </TouchableOpacity>
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        containerStyle={
          {
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
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
              bottomSheetRef.current.close();
              setTempDenda({
                keterangan: '',
                jumlah: ''
              })
            }}
          />
        </View>
      </BottomSheet>
    </ScrollView>
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
});
