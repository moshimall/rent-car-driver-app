import {ic_pinpoin} from 'assets/icons';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {Image, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';

const FinishedTaskCard: React.FC = () => {
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
    </View>
  );
};

export default FinishedTaskCard;

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
  textOrderId: {fontSize: 12, fontWeight: 'bold', color: theme.colors.black},
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
});
