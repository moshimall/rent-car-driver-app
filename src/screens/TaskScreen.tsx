import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import MyTaskSection from 'components/TaskScreenComponent/MyTaskSection/MyTaskSection';
import React, {useEffect} from 'react';
import {h1} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {useNavigation} from '@react-navigation/native';

const TaskScreen = () => {
  const navigation = useNavigation();

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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>Selesai</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MyTaskSection />
    </View>
  );
};

export default hoc(TaskScreen, theme.colors.navy, false, 'light-content');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
