import MainTab from './MainTabNavigator';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginScreen,
  OtpVerificationScreen,
  RegisterScreen,
  TaskDetailScreen,
} from '../screens';
import {RootStackParamList} from '../types/navigator';
import { theme } from 'utils';

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
        <RootStack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.navy,
            },
          }}
        />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen
          name="OtpVerification"
          component={OtpVerificationScreen}
        />
      </>
    </RootStack.Navigator>
  );
};

export default MainStack;
