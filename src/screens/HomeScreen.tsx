import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {boxShadow, container, iconCustomSize, rowCenter} from 'utils/mixins';
import {ic_main_icon, ic_pinpoin} from 'assets/icons';
import {theme} from 'utils';
import Button from 'components/Button';
import {useHelperStore} from 'store/helpersStore';
import {IHelpers} from 'types/store.types';
import { showToast } from 'utils/Toast';

const HomeScreen = () => {
  const helpers = useHelperStore() as IHelpers;

  useEffect(() => {
    console.log('lerprs = ', helpers.isShowToast);
  }, [helpers.isShowToast]);

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#fff', padding: 16}}>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image source={ic_main_icon} style={iconCustomSize(45)} />
            <Text style={styles.textName}>Driver</Text>
          </View>
          <View style={styles.rightIcon} />
        </View>

        <Text style={[styles.textName, {marginTop: 28}]}>Halo, Driver</Text>
      </View>

      <View style={[rowCenter, {padding: 16, justifyContent: 'space-between'}]}>
        <TouchableOpacity style={styles.activeButton}>
          <Text style={styles.activeText}>Pengantaran</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.inactiveText}>Dengan Supir</Text>
        </TouchableOpacity>
      </View>
      <View style={{margin: 16}}>
        <FlatList
          // data={[]}
          data={[...Array(6).fill(1)]}
          renderItem={() => (
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
                    <Text style={styles.textLocation}>
                      01 Juli 2022 | 09:00 AM
                    </Text>
                  </View>
                </View>

                <View style={styles.lineVertical} />

                <View style={rowCenter}>
                  <Image source={ic_pinpoin} style={iconCustomSize(45)} />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.textTitle}>Tanggal Pengembalian</Text>
                    <Text style={styles.textLocation}>
                      03 Juli 2022 | 09:00 AM
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.textComment}>Comment : </Text>

              <Button
                _theme="navy"
                title="Terima Tugas"
                onPress={() => {
                  Alert.alert(
                    'Terima Tugas',
                    'Apakah anda yakin untuk menerima Tugas?',
                    [
                      {
                        text: 'Tidak',
                        onPress(value) {},
                      },
                      {
                        text: 'Ya',
                        onPress(value) {
                          showToast({
                            message: 'Berhasil Menerima Tugas',
                            title: 'Sukses',
                            type: 'success'
                          })
                        },
                      },
                    ],
                  );
                }}
                styleWrapper={{
                  width: '95%',
                  alignSelf: 'center',
                  marginVertical: 20,
                }}
              />
            </View>
          )}
          ListEmptyComponent={()=> (
            <Text style={{alignSelf: 'center', marginTop: '50%'}}>Belum ada tugas</Text>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

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
    backgroundColor: theme.colors.navy,
    width: '48%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },

  inactiveButton: {
    backgroundColor: theme.colors.white,
    width: '48%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  inactiveText: {
    fontSize: 12,
    color: '#B5B5B5',
    fontWeight: 'bold',
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
});
