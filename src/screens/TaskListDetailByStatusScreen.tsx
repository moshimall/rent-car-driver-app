import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'types/navigator';
import {ic_arrow_left_white} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import {WINDOW_WIDTH, rowCenter} from 'utils/mixins';
import {h1} from 'utils/styles';
import {theme} from 'utils';
import CardAmbilMobil from 'components/Cards/WithoutDriver/CardAmbilMobil';
import CardAntarMobil from 'components/Cards/WithoutDriver/CardAntarMobil';
import CardParkirMobil from 'components/Cards/WithoutDriver/CardParkirMobil';
import CardTakeFromGarage from 'components/Cards/WithoutDriver/CardTakeFromGarage';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskListDetailByStatus'>;

type IStatus =
  | 'Ambil dari Garasi'
  | 'Antar Mobil'
  | 'Ambil Mobil'
  | 'Parkir ke Garasi';

const DATA_STATUS: IStatus[] = [
  'Ambil dari Garasi',
  'Antar Mobil',
  'Ambil Mobil',
  'Parkir ke Garasi',
];

const TaskListDetailByStatusScreen = () => {
  const navigation = useNavigation();
  const {type} = useRoute<ScreenRouteProp>().params;

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
              Tugas Driver - {type}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const renderItem = () => <CardAmbilMobil item={{}} />;

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View
          style={[rowCenter, {paddingHorizontal: 30, alignItems: 'center'}]}>
          {DATA_STATUS.map((status, i) => (
            <View key={i}>
              <View
                style={[
                  rowCenter,
                  {
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  <View style={styles.dot} />
                  <View style={styles.textDotWrapper}>
                    <Text style={styles.textStatus}>{status}</Text>
                  </View>
                </View>
                {i != DATA_STATUS.length - 1 && <View style={styles.line} />}
              </View>
            </View>
          ))}
        </View>
      </View>
        <FlatList style={{
					margin: 20
				}} data={[...Array(3)]} renderItem={renderItem} />
    </View>
  );
};

export default TaskListDetailByStatusScreen;

const styles = StyleSheet.create({
  dot: {
    height: 20,
    width: 20,
    backgroundColor: theme.colors.navy,
    borderRadius: WINDOW_WIDTH / 2,
  },
  line: {
    borderBottomWidth: 1.5,
    borderBottomColor: theme.colors.grey5,
    width: WINDOW_WIDTH / 5,
  },
  textDotWrapper: {
    position: 'absolute',
    width: WINDOW_WIDTH / 3.5,
    top: 25,
    alignSelf: 'center',
  },
  textStatus: {
    fontSize: 12,
    textAlign: 'center',
  },
});
