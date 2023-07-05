import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import React, {useCallback} from 'react';
import {ic_main_icon2} from 'assets/icons';
import {iconCustomSize} from 'utils/mixins';
import {Image, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  const checkCodepushUpdate = () => {
    CodePush.checkForUpdate()
      .then(async update => {
        if (update) {
          navigation.navigate('CodepushUpdateManager', {
            failedInstall: update.failedInstall,
          });
        } else {
          navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useFocusEffect(() => {
    useCallback(() => {
      const bundleId = DeviceInfo.getBundleId();
      console.log(bundleId);
      checkCodepushUpdate();
    }, []);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={ic_main_icon2}
        style={iconCustomSize(200)}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
