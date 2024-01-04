import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useHelperStore} from 'store/actions/helpersStore';
import {IHelpers} from 'types/store.types';
import MainStackNavigator from './MainStackNavigator';
import Toast from 'components/Toast/Toast';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Config from 'react-native-config';

import {OneSignal} from 'react-native-onesignal';
console.log('Config.APP_ID = ', Config.APP_ID);
// OneSignal.initialize('14935259-a535-428e-b10d-2b8f0d68a752');
OneSignal.initialize(Config.APP_ID || '');

const Router: React.FC = () => {
  const helpers = useHelperStore() as IHelpers;
  useEffect(() => {
    OneSignal.Notifications.requestPermission(true);
    // OneSignal.initialize('14935259-a535-428e-b10d-2b8f0d68a752');s

    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
    return () => {
      // OneSignal.Notifications.removeEventListener('click');
    };
  }, []);

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
