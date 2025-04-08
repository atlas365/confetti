import React, {useMemo} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {View, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import ConfettiImage from '../assets/confetti.png';

const NUM_CONFETTI = 200;
const COLORS = ['#00e4b2', '#09aec5', '#107ed5'];
const CONFETTI_SIZE = 16;

const createConfetti = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

  return [...new Array(NUM_CONFETTI)].map((_, i) => {
    return {
      key: i,
      x: screenWidth / 2,
      y: screenHeight / 2,
      angle: Math.floor(360 * Math.random()),
      color: COLORS[i % COLORS.length],
    };
  });
};

const Confetti = ({sharedValue, sharedValue2}) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

  const confetti = useMemo(createConfetti, []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.cannon}></View>
      {confetti.map(({key, x, y, angle, color}) => {
        const modAngle = Math.random() < 0.5 ? -1 : 1;
        const modX = Math.random() < 0.5 ? -1 : 1;

        const midX = screenWidth * Math.random() + modX * 50;
        const midY = 200 * Math.random() - 50;

        const endX = screenWidth * Math.random() + modX * 200;
        const endY = screenHeight * (Math.random() / 2 + 1.3) + midY;

        const angleVel = modAngle * Math.random() * 5 + 15;
        const angleVelY = modAngle * Math.random() * 5 + 15;
        //const angleVelZ = modAngle * Math.random() * 5 + 25;
        const style = useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateX: interpolate(
                  sharedValue.value,
                  [1, 50, 100],
                  [x, midX, endX],
                ),
              },
              {
                translateY: interpolate(
                  sharedValue.value,
                  [1, 50, 100],
                  [y, midY, endY],
                ),
              },
              {rotate: `${(angle / angleVel) * sharedValue2.value}deg`},
              //{rotateY: `${(angle / angleVelY) * sharedValue.value}deg`},
              //{rotateZ: `${(angle / angleVelZ) * sharedValue.value}deg`},
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
  cannon: {
    position: 'absolute',
    top: Dimensions.get('screen').height / 2 - 10,
    left: Dimensions.get('screen').width / 2 - 15,
    height: 60,
    width: 50,
    backgroundColor: 'black',
    zIndex: 5
  },
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
