import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {RootStackParamList} from '../types/navigator';
import {LoginScreen, OtpVerificationScreen, RegisterScreen} from '../screens';
import MainTabNavigator from './MainTabNavigator';
import {theme} from 'utils';
import MainTab from './MainTabNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {


  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
      initialRouteName="MainTab">
      <>
        <RootStack.Screen name="MainTab" component={MainTab} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      </>
    </RootStack.Navigator>
  );
};

export default MainStack;
