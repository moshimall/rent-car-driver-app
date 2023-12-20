import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useHelperStore} from 'store/actions/helpersStore';
import {IHelpers} from 'types/store.types';
import MainStackNavigator from './MainStackNavigator';
import Toast from 'components/Toast/Toast';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {LogLevel, OneSignal} from 'react-native-onesignal';



const Router: React.FC = () => {
  const helpers = useHelperStore() as IHelpers;
  useEffect(() => {
    OneSignal.Notifications.requestPermission(true);
    OneSignal.initialize('14935259-a535-428e-b10d-2b8f0d68a752');

    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
    getPlayerId();
    return () => {
      // OneSignal.Notifications.removeEventListener('click');
    };
  }, []);

  const getPlayerId = async () => {
    try {
      const subId = OneSignal.User.pushSubscription.getPushSubscriptionId();
      const subToken =
        OneSignal.User.pushSubscription.getPushSubscriptionToken();

      console.log('subId = ', subId);
      console.log('subToken = ', subToken);
    } catch (error) {
      console.log('err = ', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </BottomSheetModalProvider>
      <Toast
        message={helpers.messageToast}
        title={helpers.titleToast}
        type={helpers.typeToast}
        show={helpers.isShowToast}
      />
    </SafeAreaView>
  );
};

export default Router;
