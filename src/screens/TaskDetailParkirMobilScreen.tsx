import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import hoc from 'components/hoc';
import React, {useEffect, useState} from 'react';
import UploadImageInput from 'components/TaskScreenComponent/UploadImageInput/UploadImageInput';
import {deepClone, theme} from 'utils';
import {h1, h4} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {
  IParamUPdateCourirTasks,
  updateCourirTasks,
} from 'store/effects/taskStore';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {rowCenter} from 'utils/mixins';
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

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetailParkirMobil'>;

const TaskDetailAmbilMobilScreen = () => {
  const navigation = useNavigation();
  const {task_id, item, type} = useRoute<ScreenRouteProp>().params;
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

    const formData: IParamUPdateCourirTasks = {
      id: task_id,
      image_captures: [...bulkImage],
      status: 'RETURN_TO_GARAGE',
      note: note,
    };

    if (type === 'Dengan Supir') {
      formData['date'] = item.date;
    }

    const res = await updateCourirTasks(formData);
    if (!res) {
      showToast({
        title: 'Terjadi Kesalahan',
        type: 'error',
        message: 'Terjadi Kesalahan, silahkan hubungi Admin.',
      });
      return;
    }

    console.log('ress sukses RETURN_TO_GARAGE = ', res);
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
          label="Upload Foto"
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

export default hoc(
  TaskDetailAmbilMobilScreen,
  theme.colors.navy,
  false,
  'light-content',
);

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
