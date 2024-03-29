import {ic_rounded_arrow_left, ic_rounded_arrow_right} from 'assets/icons';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import { WINDOW_WIDTH } from 'utils/mixins';

interface IProps {
  iconName: 'arrowright' | 'arrowleft';
  onPress: () => void;
}

const CarouselButton: React.FC<IProps> = ({iconName, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        iconName === 'arrowleft' ? {left: WINDOW_WIDTH/30} : {right: WINDOW_WIDTH/8},
      ]}
      onPress={onPress}>
      <Image
        source={
          iconName === 'arrowleft'
            ? ic_rounded_arrow_left
            : ic_rounded_arrow_right
        }
        style={styles.arrowImage}
      />
    </TouchableOpacity>
  );
};

export default CarouselButton;

const styles = StyleSheet.create({
  button: {
    width: 31,
    height: 31,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '45%',
  },
  arrowImage: {width: 30, height: 30},
});
