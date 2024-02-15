import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DataItemTask, WithDriverTaskDetail, WithoutDriverTaskDetail} from './tasks.types';
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
    item: WithoutDriverTaskDetail;
    task_id?: number;
  };
  TaskCompleteDetail: {
    item: DataItemTask;
    vehicleId?: Vehicle;
  };
  TaskDetailAmbilMobil: {
    item: WithoutDriverTaskDetail;
  };
  TaskDetailParkirMobil: {
    item: WithoutDriverTaskDetail;
  };
  Splash: undefined;
  TaskListByType: {
    type: ITypeTask;
  };
  TaskListDetailByStatus: {
    id: number;
    type: ITypeTask;
    item?: WithDriverTaskDetail;
  };
  TaskListDetailByDay: {
    id: number;
    type: ITypeTask;
  };
  TaskDetailAmbilMobilDariGarasi: {
    task_id: number;
    item: WithoutDriverTaskDetail | WithDriverTaskDetail;
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
