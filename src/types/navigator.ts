import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ProductDetail: {productId: string};
  MainTab?: RootTabParamList;
  CodepushUpdateManager: {failedInstall: boolean};
  Login: undefined;
  Auth: undefined;
  OtpVerification: undefined;
  Register: undefined;
  TaskDetail: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Task: undefined;
  Inbox: undefined;
  Account: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

type navigationProps = StackNavigationProp<RootStackParamList>;

export type {RootStackParamList, navigationProps, RootTabParamList};
