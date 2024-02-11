import CodePush from 'react-native-code-push';
import CodepushUpdateManager from 'screens/CodepushUpdateManager';
import MainTab from './MainTabNavigator';
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';
import {theme} from 'utils';
import {
  LoginScreen,
  OtpVerificationScreen,
  RegisterScreen,
  TaskDetailAmbilMobilScreen,
  TaskDetailAntarMobilScreen,
  TaskDetailParkirMobilScreen,
} from '../screens';
import SplashScreen from 'screens/SplashScreen';
import TaskCompleteDetailScreen from 'screens/TaskCompleteDetailScreen';
import {useAuthStore} from 'store/actions/authStore';
import TaskListByTypeScreen from 'screens/TaskListByTypeScreen';
import TaskListDetailByStatusScreen from 'screens/TaskListDetailByStatusScreen';
import TaskDetailAmbilMobilDariGarasiScreen from 'screens/TaskDetailAmbilMobilDariGarasiScreen';

const RootStack = createStackNavigator<RootStackParamList>();

const Main: React.FC = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
      initialRouteName="Splash">
      <>
        {!isAuthenticated && (
          <>
            <RootStack.Screen name="Splash" component={SplashScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
            <RootStack.Screen
              name="OtpVerification"
              component={OtpVerificationScreen}
            />
            <RootStack.Screen
              name="CodepushUpdateManager"
              component={CodepushUpdateManager}
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
            />
          </>
        )}
        {isAuthenticated && (
          <>
            <RootStack.Screen name="MainTab" component={MainTab} />
            <RootStack.Screen
              name="CodepushUpdateManager"
              component={CodepushUpdateManager}
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
            />
            <RootStack.Screen
              name="TaskDetailAntarMobil"
              component={TaskDetailAntarMobilScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.navy,
                },
              }}
            />
            <RootStack.Screen
              name="TaskDetailAmbilMobil"
              component={TaskDetailAmbilMobilScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.navy,
                },
              }}
            />
            <RootStack.Screen
              name="TaskDetailParkirMobil"
              component={TaskDetailParkirMobilScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.navy,
                },
              }}
            />

            <RootStack.Screen
              name="TaskCompleteDetail"
              component={TaskCompleteDetailScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.navy,
                },
              }}
            />

            <RootStack.Screen
              name="TaskListByType"
              component={TaskListByTypeScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.navy,
                },
              }}
            />
            <RootStack.Screen
              name="TaskListDetailByStatus"
              component={TaskListDetailByStatusScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.navy,
                },
              }}
            />
            <RootStack.Screen
              name="TaskDetailAmbilMobilDariGarasi"
              component={TaskDetailAmbilMobilDariGarasiScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.navy,
                },
              }}
            />
          </>
        )}
      </>
    </RootStack.Navigator>
  );
};

const codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
const MainStack = CodePush(codePushOptions)(Main);
export default MainStack;
