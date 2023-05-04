import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Confetti from './components/ConfettiWrapper';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import SlideLoadButton from './components/SlideLoadButton';

function App(): JSX.Element {
  const sharedValue = useSharedValue(1)
  const onPress = () => {
    sharedValue.value = withTiming(100, {
      duration: 8000,
      easing: Easing.bezier(0.1, 0.4, 0.5, 0.6),
    });
  }

  const onReset = () => {
    sharedValue.value = 1
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <SlideLoadButton />
      <Confetti sharedValue={sharedValue}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
});

export default App;
