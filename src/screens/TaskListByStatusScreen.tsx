import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {ic_arrow_left_white, ic_progress_clock} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {h1} from 'utils/styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'types/navigator';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskListByStatus'>;

const TaskListByStatusScreen = () => {
  const navigation = useNavigation();
  const {status} = useRoute<ScreenRouteProp>().params;

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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>{status}</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        data={[...Array(3)]}
        renderItem={() => (
          <TouchableOpacity style={[rowCenter, styles.cardItem]}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                <Text style={{fontWeight: '700'}}>Task ID</Text>: GR02547896
              </Text>

              <Text style={{fontSize: 14, marginVertical: 5}}>
                Kevin Sanjaya | Suzuki Ertiga
              </Text>
              <Text style={{fontSize: 12, color: '#666'}}>
                01 Jul 2022 - 03 Jul 2022
              </Text>
            </View>

            <View style={[rowCenter]}>
                <Image source={ic_progress_clock} style={iconCustomSize(15)} />
                <Text style={{fontSize: 12, marginLeft: 5}}>3 of 4</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TaskListByStatusScreen;

const styles = StyleSheet.create({
  cardItem: {
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 6,
    alignItems: 'flex-start'
  },
});
