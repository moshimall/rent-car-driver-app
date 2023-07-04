import CodePush from 'react-native-code-push';
import CodepushUpdateManager from 'screens/CodepushUpdateManager';
import DeviceInfo from 'react-native-device-info';
import MainTab from './MainTabNavigator';
import React, {useEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';
import {theme} from 'utils';
import {useNavigation} from '@react-navigation/native';
import {
  LoginScreen,
  OtpVerificationScreen,
  RegisterScreen,
  TaskDetailAmbilMobilScreen,
  TaskDetailAntarMobilScreen,
  TaskDetailParkirMobilScreen,
} from '../screens';
import SplashScreen from 'screens/SplashScreen';

const RootStack = createStackNavigator<RootStackParamList>();

const Main: React.FC = () => {
  const navigation = useNavigation();

  const checkCodepushUpdate = () => {
    CodePush.checkForUpdate()
      .then(async update => {
        if (update) {
          navigation.navigate('CodepushUpdateManager', {
            failedInstall: update.failedInstall,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const bundleId = DeviceInfo.getBundleId();
    console.log(bundleId);
    checkCodepushUpdate();
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
      initialRouteName="Splash">
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
        <RootStack.Screen name="Splash" component={SplashScreen} />
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

const codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
const MainStack = CodePush(codePushOptions)(Main);
export default MainStack;
