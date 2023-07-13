import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ChampagneBubbles from './components/ChampagneBubbles';

function App(): JSX.Element {
  const [trigger, setTrigger] = React.useState(false);

  const onPress = () => {
    setTrigger(true);
  };

  const onReset = () => {
    setTrigger(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <ChampagneBubbles trigger={trigger} />
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
    marginBottom: 10,
  },
});

export default App;
