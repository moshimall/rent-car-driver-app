import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import MyTaskSection from 'components/TaskScreenComponent/MyTaskSection/MyTaskSection';
import React, {useEffect, useState} from 'react';
import TopTabs from 'components/TaskScreenComponent/TopTabs/TopTabs';
import {h1, h2, h4} from 'utils/styles';
import {
  ic_arrow_left_white,
  ic_camera,
  ic_lock,
  ic_notif,
  ic_profile,
  ic_question,
} from 'assets/icons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WINDOW_WIDTH, iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {useNavigation} from '@react-navigation/native';
import FinishedTaskSection from 'components/TaskScreenComponent/FinishedTaskSection/FinishedTaskSection';
import {theme} from 'utils';
import {img_user} from 'assets/images';

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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              Akun Saya
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image source={img_user} style={iconCustomSize(121)} />
        <Image
          source={ic_camera}
          style={[iconCustomSize(37), styles.icCamera]}
        />
      </View>

      {DATA.map((x, i) => (
        <View key={i} style={[rowCenter, {
          borderBottomColor: 'rgba(217, 217, 217, 1)',
          borderBottomWidth: 1,
          padding: 20
        }]}>
          <Image source={x.ic} style={iconSize} />
          <Text style={[h4, {marginLeft: 10}]}>{x.text}</Text>
        </View>
      ))}
    </View>
  );
};

const DATA = [
  {ic: ic_profile, text: 'Data Pribadi', screen: ''},
  {ic: ic_lock, text: 'Ubah Password', screen: ''},
  {ic: ic_notif, text: 'Notifikasi', screen: ''},
  {ic: ic_question, text: 'Pusat Bantuan', screen: ''},
];

export default hoc(TaskScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  userWrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  icCamera: {marginTop: -20, alignSelf: 'center', marginRight: 5},
});
