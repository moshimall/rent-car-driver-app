import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import { rowCenter } from 'utils/mixins';
import { h1 } from 'utils/styles';
import { ic_arrow_left_white } from 'assets/icons';
import hoc from 'components/hoc';
import TopTabs from 'components/TaskScreenComponent/TopTabs/TopTabs';

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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              Tugas
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TopTabs onChangeTab={(val) => {}} />
    </View>
  )
}

export default hoc(TaskScreen)

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
})