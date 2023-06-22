import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Loader = () => {
  return (
    <View style={styles.container}>
      <Lottie
        source={require('../assets/comps/loader.json')}
        autoPlay
        style={{height: SCREEN_HEIGHT * 0.2}}
      />
    </View>
  );
};
const SIZE = 100;

export default Loader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
