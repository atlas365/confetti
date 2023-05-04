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
import LinearGradient from 'react-native-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const SlideLoadButton = () => {
  const clicked = useSharedValue(0);

  // const bgStyle = useAnimatedStyle(() => {
  //   return {opacity: interpolate(clicked.value, [0, 1], [1, 0.5])};
  // });

  const onClick = () => {
    clicked.value = withTiming(1, 1000)
  };

  const bgX = useAnimatedStyle(() => {
    return {x: interpolate(clicked.value, [0, 1], [0, 1]), y: 0};
  });

  return (
    <Pressable onPress={onClick}>
      <AnimatedGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={[styles.linearGradient]}>
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </AnimatedGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    borderRadius: 5,
  },
});

export default SlideLoadButton;
