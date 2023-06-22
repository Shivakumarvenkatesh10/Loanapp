import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import {base_url} from '../../common/Api';

const Otpscreen = ({route, navigation}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  let mobileNo = route.params.mobile;
  let userId = route.params.userId;
  let otpno = route.params.otpno;

  const [otp, setOtp] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
  });
  const [loading, setLoading] = useState(true);
  const [otpNo, setOtpNo] = useState(route.params.otpno);

  useEffect(() => {
    setLoading(false);
  }, []);

  const convertedMobileNo = mobileNo.replace(/\d(?=\d{4})/g, '*');

  const verifyOTP = async () => {
    const otpCon =
      otp.first + otp.second + otp.third + otp.fourth + otp.fifth + otp.sixth;
    console.log(otpCon);

    await axios
      .post(base_url + `Account/verify/otp`, {
        phoneNumber: mobileNo,
        optNumber: otpCon,
      })
      .then(response => {
        if (response.data.success === true) {
          navigation.navigate('BottomSheet', {
            mobile: mobileNo,
            userId: userId,
          });
        } else {
          alert('Invalid OTP');
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const resendOTP = async () => {
    await axios
      .post(base_url + 'Account/resend/otp', {
        phoneNumber: mobileNo,
      })
      .then(res => {
        setOtpNo(res.data.result.optNumber);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0083" />
        </View>
      ) : (
        <View style={{paddingHorizontal: 25}}>
          <Text style={styles.text}>OTP sent to your phone </Text>
          <Text style={[styles.text, {paddingTop: 10}]}>
            {convertedMobileNo}
          </Text>
          <Text style={[styles.text, {paddingTop: 10}]}>
            OTP will expire in - 10s
          </Text>

          <View style={styles.otpContainer}>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={text => {
                  setOtp({...otp, first: text});
                  text && secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={text => {
                  setOtp({...otp, second: text});
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={text => {
                  setOtp({...otp, third: text});
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={text => {
                  setOtp({...otp, fourth: text});
                  text
                    ? fifthInput.current.focus()
                    : thirdInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fifthInput}
                onChangeText={text => {
                  setOtp({...otp, fifth: text});
                  text
                    ? sixthInput.current.focus()
                    : fourthInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={sixthInput}
                onChangeText={text => {
                  setOtp({...otp, sixth: text});
                  !text && fifthInput.current.focus();
                }}
              />
            </View>
          </View>

          <View>
            <Text style={{fontFamily: 'Poppins-SemiBold', textAlign: 'center'}}>
              Otp Number: {otpno}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              verifyOTP();
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: '#fff',
                fontFamily: 'Poppins-Medium',
              }}>
              Verify
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {paddingTop: 20, fontSize: 14, fontWeight: 'normal'},
            ]}>
            Didn't recieve OTP ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              resendOTP();
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: '#FF0083',
                paddingTop: 20,
                fontWeight: 'bold',
              }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Otpscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    paddingTop: 30,
    color: '#000',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
  },
  inputStyle: {
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#FF0083',
    padding: 10,
    borderRadius: 30,
    marginBottom: 30,
  },
  otpContainer: {
    margin: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: '#FF0083',
    borderWidth: 1,
    margin: 10,
  },
  otpText: {
    fontSize: 20,
    color: '#000',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
});
