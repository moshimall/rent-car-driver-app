import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useEffect} from 'react';
import useTaskListDetailByStatus from './hooks/useTaskListDetailByStatus';
import TaskDetailByStatusCard from '../../components/Cards/TaskDetailByStatusCard';
import {h1} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {theme} from 'utils';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type TaskListDetailByStatusScreenRouteProp = RouteProp<
  RootStackParamList,
  'TaskListDetailByStatus'
>;

type IStatus =
  | 'Ambil dari Garasi'
  | 'Antar Mobil'
  | 'Ambil Mobil'
  | 'Parkir ke Garasi';

const WITHOUT_DRIVER_STATUS: IStatus[] = [
  'Ambil dari Garasi',
  'Antar Mobil',
  'Ambil Mobil',
  'Parkir ke Garasi',
];

const WITH_DRIVER_STATUS: IStatus[] = ['Ambil dari Garasi', 'Parkir ke Garasi'];

const TaskListDetailByStatusScreen = () => {
  const navigation = useNavigation();
  const {type, id} = useRoute<TaskListDetailByStatusScreenRouteProp>().params;
  const {data} = useTaskListDetailByStatus();

  const taskStatus =
    type === 'Dengan Supir' ? WITH_DRIVER_STATUS : WITHOUT_DRIVER_STATUS;

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

  const renderItem = ({item}: {item: any}) => {
    return <TaskDetailByStatusCard id={id} item={item} type={type} />;
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <View
          style={[rowCenter, {paddingHorizontal: 30, alignItems: 'center'}]}>
          {taskStatus.map((status, i) => (
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
                {i != taskStatus.length - 1 && <View style={styles.line} />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          padding: 20,
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(x, i) => i.toString()}
      />
    </View>
  );
};

export default hoc(
  TaskListDetailByStatusScreen,
  theme.colors.navy,
  false,
  'light-content',
);

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