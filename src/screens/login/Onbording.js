import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Mobile from '../../assets/images/mobile_logo.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Onboard = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 20}}>
        <Text style={styles.textStyle}>Instant Small Loan</Text>
      </View>
      <View style={styles.colImag}>
        {/* <Mobile
          // style={{transform: [{rotate: '-15deg'}]}}
          width={200}
          height={200}
        /> */}
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/applogo.jpeg')}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.touch}>
        <Text style={styles.textStyleTouch}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" color="#fff" size={22} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Onboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 30,
    color: '#20315f',
    fontFamily: 'Poppins-SemiBold',
  },
  touch: {
    backgroundColor: '#FF0083',
    padding: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 50,
  },
  textStyleTouch: {
    // fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  colImag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 150,
  },
});
