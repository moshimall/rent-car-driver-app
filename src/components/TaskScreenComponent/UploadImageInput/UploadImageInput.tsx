import {h1, h4} from 'utils/styles';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {showToast} from 'utils/Toast';
import {theme} from 'utils';
import {
  ic_info_error,
  ic_rounded_close,
  ic_rounded_image_file,
  ic_take_photo,
} from 'assets/icons';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  PermissionsAndroid,
  Alert,
} from 'react-native';

interface IProps {
  onCameraChange: (res: ImagePickerResponse['assets']) => void;
  onDelete: (i: number) => void;
  selected?: string;
  errorMessage?: string;
  label?: string;
  selectedImageLabel: string;
  containerStyle?: ViewStyle;
  bulkImage: any[];
  setBulkImage: any;
}

const UploadImageInput: React.FC<IProps> = ({
  selected,
  errorMessage,
  onDelete,
  label,
  selectedImageLabel,
  containerStyle = {marginTop: 10},
  onCameraChange,
  bulkImage,
  setBulkImage,
}) => {
  const onOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: ImagePickerResponse = await launchCamera({
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
        });

        if (Number(result.assets?.[0]?.fileSize) > 2097152) {
          throw new Error('Maaf, ukuran file tidak boleh lebih dari 2MB!');
        } else {
          onCameraChange(result.assets);
        }
      } else {
        throw new Error('Camera permission denied');
      }
    } catch (error: any) {
      showToast({
        title: 'Gagal',
        type: 'error',
        message: error?.message || 'Terjadi kesalahan',
      });
    }
  };

  const onOpenGalery = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: ImagePickerResponse = await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
          selectionLimit: 3,
        });

        // console.log('result = ', result.assets[0].base64)

        if (Number(result.assets?.[0]?.fileSize) > 2097152) {
          throw new Error('Maaf, ukuran file tidak boleh lebih dari 2MB!');
        } else {
          onCameraChange(result.assets);
        }
      } else {
        throw new Error('Camera permission denied');
      }
    } catch (error: any) {
      showToast({
        title: 'Gagal',
        type: 'error',
        message: error?.message || 'Terjadi kesalahan',
      });
    }
  };

  return (
    <View style={containerStyle}>
      {label && (
        <View style={[rowCenter]}>
          <Text style={[h4, {fontSize: 12, marginBottom: 10, marginTop: 15}]}>
            {label}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.uploadInputContainer}
        onPress={() => {
          Alert.alert(
            'Upload File',
            'Silahkan pilih opsi untuk mengambil Foto',
            [
              {
                text: 'Batal',
              },
              {
                text: 'Buka Kamera',
                onPress: onOpenCamera,
              },
              {
                text: 'Buka Galery',
                onPress: onOpenGalery,
              },
            ],
          );
        }}>
        <Text style={[h4, {fontSize: 12}]}>Ambil Foto</Text>
        <Image source={ic_take_photo} style={iconCustomSize(53)} />
      </TouchableOpacity>
      <View style={[rowCenter]}>
        {bulkImage?.length > 0 &&
          bulkImage?.map((x, i) => (
            <View style={styles.uploadedImage} key={i}>
              <View style={styles.imageDetail}>
                <Image
                  source={{uri: x}}
                  style={{width: 58, height: 58, marginRight: 10, borderRadius: 10}}
                  resizeMode="cover"
                />
                <Text style={[h1, {fontSize: 14}]}>{selectedImageLabel}</Text>
              </View>

              <TouchableOpacity
                onPress={()=> onDelete(i)}
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                }}>
                <Image
                  source={ic_rounded_close}
                  style={{width: 15, height: 15, tintColor: '#000'}}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>

      {errorMessage && (
        <View style={[rowCenter, {marginTop: 5}]}>
          <Image source={ic_info_error} style={iconCustomSize(15)} />
          <Text style={[h1, {fontSize: 12, color: theme.colors.red}]}>
            {' '}
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UploadImageInput;

const styles = StyleSheet.create({
  uploadInputContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.grey3,
    borderRadius: 5,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    marginTop: 10,
    width: 58,
    marginRight: 10
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  imageDetail: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
});
