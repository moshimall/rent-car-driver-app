/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import Config from 'react-native-config';

import {OneSignal} from 'react-native-onesignal';
console.log('Config.APP_ID = ', Config.APP_ID);
// OneSignal.initialize('14935259-a535-428e-b10d-2b8f0d68a752');
OneSignal.initialize(Config.APP_ID || '');

import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
