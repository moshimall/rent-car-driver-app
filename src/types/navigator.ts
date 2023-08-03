import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { DataItemTask } from './tasks.types';

type RootStackParamList = {
  ProductDetail: {productId: string};
  MainTab?: RootTabParamList;
  CodepushUpdateManager: {failedInstall: boolean};
  Login: undefined;
  Auth: undefined;
  OtpVerification: undefined;
  Register: undefined;
  TaskDetailAntarMobil: {
    item: DataItemTask
  };
  TaskCompleteDetail: {
    item: DataItemTask
  };
  TaskDetailAmbilMobil: undefined;
  TaskDetailParkirMobil: undefined;
  Splash: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Done: undefined;
  // Inbox: undefined;
  Account: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

type navigationProps = StackNavigationProp<RootStackParamList>;

export type {RootStackParamList, navigationProps, RootTabParamList};
