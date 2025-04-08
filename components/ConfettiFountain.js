import React, {useMemo} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {View, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import ConfettiImage from '../assets/confetti.png';
import {getCoefficients} from './mathHelpers';

const NUM_CONFETTI = 100;
const COLORS = ['#00e4b2', '#09aec5', '#107ed5'];
const CONFETTI_SIZE = 16;

const createConfetti = () => {
  const {height: screenHeight} = Dimensions.get('screen');

  return [...new Array(NUM_CONFETTI)].map((_, i) => {
    return {
      key: i,
      x: 0,
      y: screenHeight / 2,
      angle: Math.floor(360 * Math.random()),
      color: COLORS[i % COLORS.length],
    };
  });
};

const Confetti = ({sharedValue, sharedValue2, sharedValue3, sharedValue4, sharedValue5}) => {
  const confetti = useMemo(createConfetti, []);
  const values = [sharedValue, sharedValue2, sharedValue3, sharedValue4, sharedValue5]
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {confetti.map(({key, angle, y, color}, index) => {

        const i = Math.floor(Math.random() * 5)
        const modAngle = Math.random() < 0.5 ? -1 : 1;
        const angleVel = modAngle * Math.random() * 5 + 25;

        const modHeight = Math.random() < 0.5 ? -1 : 1;
        const variantHeight = Math.random() * modHeight * 25;

        const modHeightX = Math.random() < 0.5 ? -1 : 1;
        const variantHeightX = Math.random() * modHeightX * 50;

        const modHorizantalV = Math.random() < 0.5 ? -1 : 1;
        const horizontalV = Math.random() * modHorizantalV * 5;

        const modHorizantalS = Math.random() < 0.5 ? -1 : 1;
        const horizontalS = Math.random() * modHorizantalS * 40;

        const modHorizantal = Math.random() < 0.5 ? -1 : 1;
        const horizantal = Math.random() * modHorizantal * 5;

        const {a, b, c} = getCoefficients(
          horizantal,
          horizontalV,
          80 + 2 * i,
          -250 + variantHeight - 2 * i,
          400,
          400 + variantHeightX,
        );

        const style = useAnimatedStyle(() => {
          return {
            transform: [
              {translateX: values[i].value + horizontalS},
              {
                translateY:
                  a * values[i].value * values[i].value +
                  b * values[i].value +
                  c +
                  y,
              },
              {rotate: `${(angle / angleVel) * values[i].value}deg`},
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
