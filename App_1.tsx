import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Confetti from './components/ConfettiCannon';
import {
  Easing,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import SlideLoadButton from './components/SlideLoadButton';

function App(): JSX.Element {
  const sharedValue = useSharedValue(1);
  const sharedValue2 = useSharedValue(1);
  // const sharedValue2 = useSharedValue(1);
  // const sharedValue3 = useSharedValue(1);
  // const sharedValue4 = useSharedValue(1);
  // const sharedValue5 = useSharedValue(1);
  // const onPress = () => {
  //   sharedValue.value = withTiming(405, {
  //     duration: 4000,
  //     easing: Easing.bezier(0.2, 0.5, 0.7, 0.7),
  //   });
  //   sharedValue2.value = withTiming(420, {
  //     duration: 4000,
  //     easing: Easing.bezier(0.2, 0.5, 0.7, 0.7),
  //   });
  //   sharedValue3.value = withTiming(435, {
  //     duration: 4000,
  //     easing: Easing.bezier(0.2, 0.5, 0.7, 0.7),
  //   });
  //   sharedValue4.value = withTiming(450, {
  //     duration: 4000,
  //     easing: Easing.bezier(0.2, 0.5, 0.7, 0.7),
  //   });
  //   sharedValue5.value = withTiming(465, {
  //     duration: 4000,
  //     easing: Easing.bezier(0.2, 0.5, 0.7, 0.7),
  //   });
  //};

  const onPress = () => {
    sharedValue2.value = withTiming(100, {
      duration: 6000,
      easing: Easing.bezier(0.2, 0.2, 0.5, 0.7),
    });
    sharedValue.value = withSequence(
      withTiming(50, {
        duration: 500,
        easing: Easing.bezier(0.2, 0.2, 0.2, 0.8),
      }),
      withDelay(
        20,
        withTiming(100, {
          duration: 4000,
          easing: Easing.bezier(0.8, 0.6, 0.6, 0.8),
        }),
      ),
    );
  };

  const onReset = () => {
    sharedValue.value = 1;
    sharedValue2.value = 1;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <Confetti
        sharedValue={sharedValue}
        sharedValue2={sharedValue2}
        // sharedValue2={sharedValue2}
        // sharedValue3={sharedValue3}
        // sharedValue4={sharedValue4}
        // sharedValue5={sharedValue5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
