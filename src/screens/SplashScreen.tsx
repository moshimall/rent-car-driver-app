import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { ic_main_icon2 } from 'assets/icons';
import { iconCustomSize } from 'utils/mixins';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
const navigation = useNavigation();
    useEffect(() => {
      
    setTimeout(() => {
        navigation.replace('Login');
    }, 2000);
      return () => {

      }
    }, [navigation])
    
  return (
    <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={ic_main_icon2}
        style={iconCustomSize(200)}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
