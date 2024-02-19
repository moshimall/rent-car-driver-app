import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useEffect, useState} from 'react';
import TaskDetailByDayCard from 'components/Cards/TaskDetailByDayCard';
import {getTaskById} from 'store/effects/taskStore';
import {h1} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {theme} from 'utils';
import {WithDriverTaskDetail} from 'types/tasks.types';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TaskListDetailByDay'>;

const TaskListDetailByDayScreen = () => {
  const navigation = useNavigation();
  const {type, id} = useRoute<ScreenRouteProp>().params;
  const isFocused = useIsFocused();
  const [taskById, setTaskById] = useState([]);

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

  const renderItem = ({item}: {item: WithDriverTaskDetail}) => {
    return <TaskDetailByDayCard type={type} id={id} item={item} />;
  };

  const _getTaskById = async () => {
    try {
      const res = await getTaskById(id);
      setTaskById(res?.data || []);
    } catch (error) {
      console.log('err = ', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      _getTaskById();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        contentContainerStyle={{
          padding: 20,
        }}
        data={taskById || []}
        renderItem={renderItem}
        keyExtractor={(x, i) => i.toString()}
      />
    </View>
  );
};

export default hoc(
  TaskListDetailByDayScreen,
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
