import React, {useMemo, useEffect} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import BubbleImage from '../assets/bubbles.png';
import {
  Easing,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const createBubbleMeta = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  let delay = 0;
  return [...new Array(100)].map((_, i) => {
    const modDelay = Math.random() < 0.5 ? -1 : 1;
    delay = delay + Math.ceil(Math.random() * 20 + modDelay * 20 + 20);
    //const xStart = screenWidth / 4 * (i % 3 + 1)
    return {
      key: `${Math.floor(Math.random() * 1000000)}`,
      xStart: screenWidth / 2,
      yStart: screenHeight,
      size: Math.ceil(Math.random() * 10),
      delay: delay,
    };
  });
};

const small = {
  width: 10,
  height: 10,
};
const medium = {
  width: 20,
  height: 20,
};
const large = {
  width: 30,
  height: 30,
};
const Bubble = ({key, xStart, yStart, size, delay, trigger}) => {
  const {width: screenWidth} = Dimensions.get('screen');
  const animation = useSharedValue(1);

  useEffect(() => {
    if (trigger) {
      animation.value = withDelay(
        delay,
        withTiming(100, {
          duration: 3000,
          easing: Easing.bezier(0.4, 0.4, 0.6, 0.8),
        }),
      );
    } else {
      animation.value = 1;
    }
  }, [trigger]);

  let sizeStyle = small;
  switch (size) {
    case 1:
      sizeStyle = small;
      break;
    case 2:
      sizeStyle = small;
      break;
    case 3:
      sizeStyle = small;
      break;
    case 4:
      sizeStyle = small;
      break;
    case 5:
      sizeStyle = medium;
      break;
    case 6:
      sizeStyle = medium;
      break;
    case 7:
      sizeStyle = medium;
      break;
    case 8:
      sizeStyle = large;
      break;
    case 9:
      sizeStyle = large;
      break;
  }

  const yEnd = -100;
  const xMod = Math.random() < 0.5 ? -1 : 1;
  const xEnd = xStart + Math.random() * 60 * xMod;

  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(animation.value, [1, 100], [xStart, xEnd])},
        {translateY: interpolate(animation.value, [1, 100], [yStart, yEnd])},
      ],
    };
  });

  return (
    <Animated.View
      key={key}
      style={[styles.bubbleContainer, animateStyle, sizeStyle]}>
      <FastImage source={BubbleImage} style={sizeStyle} />
    </Animated.View>
  );
};

const ChampagneBubbles = ({trigger}) => {
  const bubbles = useMemo(createBubbleMeta, []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {bubbles.map(({key, xStart, yStart, delay, size}) => {
        return (
          <Bubble
            key={key}
            xStart={xStart}
            yStart={yStart}
            delay={delay}
            size={size}
            trigger={trigger}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ChampagneBubbles;
