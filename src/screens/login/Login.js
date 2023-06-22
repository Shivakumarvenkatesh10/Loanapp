import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {base_url} from '../../common/Api';

const Login = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (mobile === '') {
      alert('Enter Mobile Number');
      return;
    }
    if (mobile.length !== 10) {
      alert('Mobile number should be of 10 digits');
      return;
    }

    setLoading(true);
    await axios
      .post(base_url + 'Account/generate/otp', {
        phoneNumber: mobile,
      })
      .then(response => {
        console.log(response);
        if (response.data.success === true) {
          alert('Otp Sent To Your Mobile Number');
          navigation.navigate('OTP', {
            mobile: mobile,
            userId: response.data.result.userId,
            otpno: response.data.result.optNumber,
          });
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0083" />
        </View>
      ) : (
        <View style={{paddingHorizontal: 25}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.imageStyle}
              source={require('../../assets/images/applogo.jpeg')}
            />
          </View>
          <View style={{alignItems: 'center', paddingVertical: 30}}>
            <Text style={{fontFamily: 'Poppins-Medium'}}>
              Add your mobile number
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#333',
                fontSize: 16,
              }}>
              We'll need to confirm it by sending a text.
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#FF0083',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <Icon
              name="mobile"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="Mobile Number"
              style={{
                flex: 1,
                paddingVertical: 0,
                fontFamily: 'Poppins-Medium',
              }}
              value={mobile}
              onChangeText={text => setMobile(text)}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>

          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF0083',
                padding: 10,
                borderRadius: 30,
                marginBottom: 30,
              }}
              onPress={() => {
                sendOTP();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                  color: '#fff',
                  fontSize: 16,
                }}>
                Send OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    borderRadius: 125,
  },
});
