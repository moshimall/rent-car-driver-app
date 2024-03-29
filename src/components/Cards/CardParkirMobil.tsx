import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ic_car, ic_pinpoin, ic_calendar, ic_park} from 'assets/icons';
import {theme} from 'utils';
import {rowCenter, iconCustomSize} from 'utils/mixins';
import {h1} from 'utils/styles';
import Button from 'components/Button';
import {useNavigation} from '@react-navigation/native';
import {DataItemTask, Vehicle} from 'types/tasks.types';
import { useDataStore } from 'store/actions/dataStore';
import { IDataStore } from 'types/data.types';

const CardParkirMobil = ({item}: {item: DataItemTask}) => {
  const navigation = useNavigation();
  const getData = useDataStore() as IDataStore;
  const vehicleId = (
    getData?.vehicles?.length > 0
      ? getData?.vehicles?.find(
          x => x?.id === item?.order?.order_detail?.vehicle_id,
        )
      : {}
  ) as Vehicle;
  return (
    <View style={[styles.cardWrapper]}>
      <View style={[rowCenter]}>
        <Image
          source={ic_park}
          style={iconCustomSize(25)}
          resizeMode="stretch"
        />
        <Text style={[h1, {marginLeft: 5, color: theme.colors.navy}]}>
          Parkir ke Garasi
        </Text>
      </View>
      <View style={styles.lineHorizontal} />
      <Text style={[h1, {marginTop: -10, marginBottom: 10}]}>
        {item?.order?.user_name}
      </Text>
      <Text style={styles.textOrderId}>
        Order ID:{' '}
        <Text style={{fontWeight: '500'}}>
          {item?.order?.order_key} |{' '}
          {vehicleId?.name || '-'}
        </Text>
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
            <Text style={styles.textTitle}>Lokasi Pengembalian</Text>
            <Text style={styles.textLocation}>Cafe Bali</Text>
          </View>
        </View>
      </View>
      <View style={styles.lineHorizontal} />

      <View style={{marginTop: 0}}>
        <View style={rowCenter}>
          <Image source={ic_calendar} style={iconCustomSize(45)} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textTitle}>Tanggal Pengembalian</Text>
            <Text style={styles.textLocation}>03 Juli 2022 | 09:00 AM</Text>
          </View>
        </View>
      </View>

      {/* <Text style={styles.textComment}>Comment : </Text> */}

      <Button
        _theme="navy"
        title="Kembalikan ke Garasi"
        onPress={() => {
          navigation.navigate('TaskDetailParkirMobil', {item: item});
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

export default CardParkirMobil;

const styles = StyleSheet.create({
  textName: {
    fontSize: 18,
    color: theme.colors.navy,
    fontWeight: '700',
    marginLeft: 10,
  },
  rightIcon: {
    height: 45,
    width: 45,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
  },
  container: {backgroundColor: '#F5F6FA', flex: 1},
  activeButton: {
    backgroundColor: theme.colors.white,
    width: '33.3%',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: theme.colors.navy,
    borderBottomWidth: 2,
    // borderRadius: 20,
  },
  activeText: {
    fontSize: 12,
    color: theme.colors.navy,
    fontWeight: 'bold',
  },

  inactiveButton: {
    backgroundColor: theme.colors.white,
    width: '33.3%',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: theme.colors.white,
    borderBottomWidth: 2,
    // borderRadius: 20,
  },
  inactiveText: {
    fontSize: 12,
    color: '#B5B5B5',
    fontWeight: '500',
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
  lineHorizontal: {
    // height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 30,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    marginVertical: 20,
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
  textComment: {
    color: '#A8A8A8',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 20,
  },
  container2: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    margin: 20,
    // alignItems: 'center',
  },
});
