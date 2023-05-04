import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

const SlideLoadButton = () => {
  const clicked = useSharedValue(0);

  // const bgStyle = useAnimatedStyle(() => {
  //   return {opacity: interpolate(clicked.value, [0, 1], [1, 0.5])};
  // });

  const onClick = () => {
    if (clicked.value === 0) {
      clicked.value = withTiming(1, 1000);
    } else {
      clicked.value = withTiming(0, 1000);
    }
  };

  const bgX = useAnimatedStyle(() => {
    return {width: interpolate(clicked.value, [0, 1], [0, 375])};
  });

  return (
    <>
      <Pressable onPress={onClick} style={styles.b}>
        <Text>Reset</Text>
      </Pressable>
      <Pressable onPress={onClick}>
        <Animated.View style={styles.bg}>
          <Animated.View style={[styles.left, bgX]}></Animated.View>
          <Animated.View style={styles.right}></Animated.View>
        </Animated.View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  b: {
    dispaly: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginVertical: 10
  },
  bg: {
    dispaly: 'flex',
    height: 40,
    flexDirection: 'row',
  },
  left: {
    backgroundColor: 'blue',
    opacity: 0.5,
  },
  right: {
    backgroundColor: 'blue',
    flex: 1,
  },
});

export default SlideLoadButton;
