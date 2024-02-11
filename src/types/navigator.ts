import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DataItemTask} from './tasks.types';
import {Vehicle} from './data.types';

type RootStackParamList = {
  ProductDetail: {productId: string};
  MainTab?: RootTabParamList;
  CodepushUpdateManager: {failedInstall: boolean};
  Login: undefined;
  Auth: undefined;
  OtpVerification: undefined;
  Register: undefined;
  TaskDetailAntarMobil: {
    item: DataItemTask;
    vehicleId?: Vehicle;
  };
  TaskCompleteDetail: {
    item: DataItemTask;
    vehicleId?: Vehicle;
  };
  TaskDetailAmbilMobil: {
    item: DataItemTask;
  };
  TaskDetailParkirMobil: {
    item: DataItemTask;
  };
  Splash: undefined;
  TaskListByType: {
    type: ITypeTask;
  };
  TaskListDetailByStatus: {
    type: ITypeTask;
  };
  TaskDetailAmbilMobilDariGarasi: {
    item: DataItemTask;
  };
};

export type ITypeTask =
  | 'Tanpa Supir'
  | 'Dengan Supir'
  | 'Airport Transfer'
  | 'Tour';

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
