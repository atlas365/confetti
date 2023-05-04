import React, {useMemo} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {View, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import ConfettiImage from '../assets/confetti.png';

const NUM_CONFETTI = 100;
const COLORS = ['#00e4b2', '#09aec5', '#107ed5'];
const CONFETTI_SIZE = 16;

const createConfetti = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

  return [...new Array(NUM_CONFETTI)].map((_, i) => {
    const modXStart = Math.random() < 0.5 ? -1 : 1;
    return {
      key: i,
      x: screenWidth / 2 + Math.random() * 10 * modXStart,
      y: -(Math.random() * 150) - 16,
      angle: Math.floor(360 * Math.random()),
      color: COLORS[i % COLORS.length],
    };
  });
};

const Confetti = ({sharedValue}) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

  const confetti = useMemo(createConfetti, []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {confetti.map(({key, x, y, angle, color}) => {
        const modAngle = Math.random() < 0.5 ? -1 : 1;
        const endX = screenWidth * Math.random() + modAngle * 200;
        const endY = screenHeight * (Math.random() / 2 + 1.3) + y;
        const angleVel = modAngle * Math.random() * 5 + 25;

        const style = useAnimatedStyle(() => {
          return {
            transform: [
              {translateX: interpolate(sharedValue.value, [1, 100], [x, endX])},
              {translateY: interpolate(sharedValue.value, [1, 100], [y, endY])},
              {rotate: `${(angle / angleVel) * sharedValue.value}deg`},
            ],
          };
        });

        return (
          <Animated.View key={key} style={[styles.confettiContainer, style]}>
            <FastImage
              source={ConfettiImage}
              tintColor={color}
              style={styles.confetti}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  confetti: {
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
  },
});

export default Confetti;
