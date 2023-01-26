import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import MyTaskSection from 'components/TaskScreenComponent/MyTaskSection/MyTaskSection';
import React, {useEffect, useState} from 'react';
import TopTabs from 'components/TaskScreenComponent/TopTabs/TopTabs';
import {h1} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rowCenter} from 'utils/mixins';
import {useNavigation} from '@react-navigation/native';
import FinishedTaskSection from 'components/TaskScreenComponent/FinishedTaskSection/FinishedTaskSection';

type TabState = 'Tugas Saya' | 'Tugas Selesai';

const TaskScreen = () => {
  const navigation = useNavigation();
  const [tabState, setTabState] = useState<TabState>('Tugas Saya');

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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>Tugas</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TopTabs onChangeTab={setTabState} />

      {tabState === 'Tugas Saya' ? <MyTaskSection /> : <FinishedTaskSection />}
    </View>
  );
};

export default hoc(TaskScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
