import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {SafeAreaView, View} from 'react-native';
import { useHelperStore } from 'store/helpersStore';
import { IHelpers } from 'types/store.types';
import MainStackNavigator from './MainStackNavigator';
import Toast from 'components/Toast/Toast';

const Router: React.FC = () => {
  const helpers = useHelperStore() as IHelpers;

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
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
