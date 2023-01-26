import { useNavigation } from '@react-navigation/native';
import {ic_pinpoin} from 'assets/icons';
import Button from 'components/Button';
import {View, Text, Image, StyleSheet} from 'react-native';
import {iconCustomSize, rowCenter} from 'utils/mixins';

const MyTaskCard: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.cardWrapper]}>
      <Text style={styles.textOrderId}>
        Order ID: <Text style={{fontWeight: '500'}}>0129389283</Text>
      </Text>

      <View style={{marginTop: 20}}>
        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Lokasi Pengantaran</Text>
            <Text style={styles.textLocation}>Cafe Bali</Text>
          </View>
        </View>

        <View style={styles.lineVertical} />

        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Lokasi Pengantaran</Text>
            <Text style={styles.textLocation}>Cafe Bali</Text>
          </View>
        </View>
      </View>
      <View style={styles.lineHorizontal} />

      <View style={{marginTop: 0}}>
        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Mulai Sewa</Text>
            <Text style={styles.textLocation}>01 Juli 2022 | 09:00 AM</Text>
          </View>
        </View>

        <View style={styles.lineVertical} />

        <View style={rowCenter}>
          <Image source={ic_pinpoin} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Tanggal Pengembalian</Text>
            <Text style={styles.textLocation}>03 Juli 2022 | 09:00 AM</Text>
          </View>
        </View>
      </View>

      <Text style={styles.textComment}>Comment : </Text>

      <Button
        _theme="navy"
        title="Detail Tugas"
        onPress={() => {
          navigation.navigate('TaskDetail');
        }}
        styleWrapper={{
          width: '95%',
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />
    </View>
  );
};

export default MyTaskCard;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  textOrderId: {fontSize: 12, fontWeight: 'bold'},
  textTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A8A8A8',
  },
  textLocation: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    marginTop: 8,
  },
  lineVertical: {
    height: 25,
    width: 1,
    marginLeft: 20,
    marginVertical: 5,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  lineHorizontal: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 30,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  textComment: {
    color: '#A8A8A8',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 20,
  },
})