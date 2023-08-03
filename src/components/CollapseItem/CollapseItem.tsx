import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode, useEffect, useLayoutEffect, useState} from 'react';
import {ic_arrow_down} from 'assets/icons';
import {rowCenter, iconSize} from 'utils/mixins';
import {h1} from 'utils/styles';
import {theme} from 'utils';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IProps {
  children: ReactNode;
	title: string;
}
const CollapseItem = ({children, title}: IProps) => {
  const trasnformValue = useSharedValue('0deg');
  const viewValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const [isRotate, setIsRotate] = useState(false);

  const [heightView, setHeightView] = useState(0);

  const rImage: any = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: trasnformValue.value,
        },
      ],
    };
  });

  const rView: any = useAnimatedStyle(() => {
    return {
      height: viewValue.value,
      opacity: opacityValue.value,
    };
  });


  useEffect(() => {
    const option = {
      duration: 500,
    };
    trasnformValue.value = withTiming(!isRotate ? '0deg' : '180deg', option);

    if (isRotate) {
      viewValue.value = withTiming(heightView, option);
      opacityValue.value = withTiming(1, option);
    } else {
      viewValue.value = withTiming(0, option);
      opacityValue.value = withTiming(0, option);
    }
  }, [isRotate]);

  return (
    <>
      <View style={styles.boxWrapper}>
        <TouchableOpacity
          onPress={() => {
            setIsRotate(!isRotate);
          }}
          style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={[h1]}>{title}</Text>
          <Animated.Image source={ic_arrow_down} style={[iconSize, rImage]} />
        </TouchableOpacity>
        <Animated.View style={[rView]}>{children}</Animated.View>
      </View>

      <View
        style={styles.hidenGem}
        onLayout={event => {
          let {x, y, width, height} = event.nativeEvent.layout;
          setHeightView(height);
          // viewValue.value = withTiming(height, {
          //   duration: 500,
          // });
        }}>
        {children}
      </View>
    </>
  );
};

export default CollapseItem;

const styles = StyleSheet.create({
  boxWrapper: {
    padding: '5%',
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    margin: 20,
		marginTop: 0,
    borderRadius: 10,
  },
  hidenGem: {
    opacity: 0,
    position: 'absolute',
    left: -200,
  },
});
