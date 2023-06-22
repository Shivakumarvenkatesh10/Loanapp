import React, {useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const CameraComponent = ({camera, gallery, close}) => {
  const refRBSheet = useRef();
  return (
    <View style={{margin: 20}}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          camera();
          close();
        }}>
        <Text style={styles.text}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          gallery();
          close();
        }}>
        <Text style={styles.text}>Choose From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touch} onPress={() => close()}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CameraComponent;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 16,
  },
  touch: {
    backgroundColor: '#000',
    borderRadius: 25,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    padding: 10,
    textAlign: 'center',
  },
});
