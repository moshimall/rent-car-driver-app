import {h1, h4} from 'utils/styles';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {showToast} from 'utils/Toast';
import {theme} from 'utils';
import {useState} from 'react';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ic_image_close, ic_info_error, ic_take_photo} from 'assets/icons';
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
  errorMessage?: string;
  label?: string;
  containerStyle?: ViewStyle;
}

const UploadImageInput: React.FC<IProps> = ({
  errorMessage,
  label,
  containerStyle = {marginTop: 10},
  onCameraChange,
}) => {
  const [images, setImages] = useState<any[]>([]);

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

          if (images.length >= 3) {
            throw new Error('Maaf, jumlah gambar maksimal hanya 3');
          }

          setImages(prev => [...prev, result.assets?.[0]]);
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

          if (images.length >= 3) {
            throw new Error('Maaf, jumlah gambar maksimal hanya 3');
          }

          setImages(prev => [...prev, ...(result.assets || [])]);
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

  const handleDeleteImage = (index: number) => {
    const val = [...images];
    val.splice(index, 1);
    setImages(val);
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

      {errorMessage && (
        <View style={[rowCenter, {marginTop: 5}]}>
          <Image source={ic_info_error} style={iconCustomSize(15)} />
          <Text style={[h1, {fontSize: 12, color: theme.colors.red}]}>
            {' '}
            {errorMessage}
          </Text>
        </View>
      )}

      <View style={{flexDirection: 'row'}}>
        {images.length > 0 &&
          images.map((image, i) => (
            <View key={`image_${i}`} style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => handleDeleteImage(i)}
                style={{zIndex: 3}}>
                <Image source={ic_image_close} style={styles.closeButton} />
              </TouchableOpacity>
              <Image source={{uri: image?.uri}} style={styles.image} />
            </View>
          ))}
      </View>
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
  imageContainer: {marginTop: 10, width: 58, height: 58, marginRight: 8},
  closeButton: {
    width: 14,
    height: 14,
    position: 'absolute',
    right: -3,
    top: -3,
  },
  image: {width: 58, height: 58, borderRadius: 3},
});
