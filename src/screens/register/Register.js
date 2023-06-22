import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {base_url} from '../../common/Api';

const Register = ({navigation}) => {
  const refGenderRBSheet = useRef();
  const refMaritalRBSheet = useRef();
  const refEducationRBSheet = useRef();
  const refLanguageRBSheet = useRef();

  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [fatName, setFatName] = useState(null);
  const [gender, setGender] = useState(null);
  const [genderText, setGenderText] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [dobOpen, setDobOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [religion, setReligion] = useState(null);
  const [language, setLanguage] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [maritalStatusText, setMaritalStatusText] = useState(null);
  const [education, setEducation] = useState(null);
  const [educationText, setEducationText] = useState(null);
  const [email, setEmail] = useState(null);
  const [income, setIncome] = useState(null);
  const [employement, setEmployement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(res => {
      setUserId(res);
      getRegisteredDet(res);
    });
  }, []);

  const getRegisteredDet = async id => {
    await axios.get(base_url + `Account/user/${id}`).then(res => {
      if (res.data.success) {
        console.log(res.data.result);
        let language = res.data.result.lanuage;
        let gender = res.data.result.gender;
        let qualification = res.data.result.qualification;
        let marriedStatus = res.data.result.maritialStatus;

        setName(res.data.result.fullName);
        setFatName(res.data.result.fatherName);
        setReligion(res.data.result.religion);
        setIncome(res.data.result.monthlyIncome);
        setEmployement(res.data.result.jobType);

        if (marriedStatus === 1) {
          setMaritalStatus('1');
          setMaritalStatusText('Single');
        } else if (marriedStatus === 2) {
          setMaritalStatus('2');
          setMaritalStatusText('Married');
        }

        if (qualification === 0) {
          setEducation('0');
          setEducationText('None');
        } else if (qualification === 1) {
          setEducation('1');
          setEducationText('SSLC');
        } else if (qualification === 2) {
          setEducation('2');
          setEducationText('PUC');
        } else if (qualification === 3) {
          setEducation('3');
          setEducationText('Degree');
        }

        if (gender === 1) {
          setGender('1');
          setGenderText('Male');
        } else if (gender === 2) {
          setGender('2');
          setGenderText('Female');
        } else if (gender === 3) {
          setGender('3');
          setGenderText('Transgender');
        }

        if (language === 0) {
          setLanguage('English');
        } else if (language === 1) {
          setLanguage('Kannada');
        }

        setEmail(res.data.result.normalizedEmail);
        setCity(res.data.result.city);
        setPincode(res.data.result.pinCode);
        setState(res.data.result.state);
        setAddress(res.data.result.address);
      }
    });
    setLoading(false);
  };

  const GenderComponent = () => {
    return (
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refGenderRBSheet.current.close();
            setGender('1');
            setGenderText('Male');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refGenderRBSheet.current.close();
            setGender('2');
            setGenderText('Female');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refGenderRBSheet.current.close();
            setGender('3');
            setGenderText('Transgender');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Transgender
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const MaritalStatusComponent = () => {
    return (
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refMaritalRBSheet.current.close();
            setMaritalStatus('1');
            setMaritalStatusText('Single');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Single
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refMaritalRBSheet.current.close();
            setMaritalStatus('2');
            setMaritalStatusText('Married');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Married
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const EducationComponent = () => {
    return (
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refEducationRBSheet.current.close();
            setEducation('0');
            setEducationText('None');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            None
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refEducationRBSheet.current.close();
            setEducation('1');
            setEducationText('SSLC');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            SSLC
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refEducationRBSheet.current.close();
            setEducation('2');
            setEducationText('PUC');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            PUC
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refEducationRBSheet.current.close();
            setEducation('3');
            setEducationText('Degree');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Degree
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const LanguageComponent = () => {
    return (
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refLanguageRBSheet.current.close();
            setLanguage('English');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refLanguageRBSheet.current.close();
            setLanguage('Kannada');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Kannada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            refLanguageRBSheet.current.close();
            setLanguage('Tamil');
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: '#fff'}}>
            Tamil
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RegisterDetails = async () => {
    navigation.navigate('Aadhaar');
    // await axios
    //   .post(base_url + 'Account/register', {
    //     userId: userId,
    //     fullName: name,
    //     dob: dob,
    //     email: email,
    //     gender: gender,
    //     address: address,
    //     city: city,
    //     state: state,
    //     pinCode: pincode,
    //     educationDetail: education,
    //     lanuage: language,
    //     religion: religion,
    //     maritialStatus: maritalStatus,
    //     fatherName: fatName,
    //     jobType: employement,
    //     monthlyIncome: income,
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res.data.success === true) {
    //       ToastAndroid.show('successfully saved', 500);
    //       navigation.navigate('Aadhaar');
    //     }
    //   });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0083" />
        </View>
      ) : (
        <View style={{margin: 20}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <Icon
                name="person-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Full Name"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={name}
                onChangeText={text => setName(text)}
              />
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
                name="person"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Father Name"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={fatName}
                onChangeText={text => setFatName(text)}
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}
              onPress={() => setDobOpen(true)}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <FontAwesome
                  name="calendar"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
                <Text
                  style={{
                    paddingVertical: 0,
                    fontFamily: 'Poppins-Medium',
                    color: dob === null ? '#9e9e9e' : '#333',
                  }}>
                  {moment(dob).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View>
                <FontAwesome
                  name="angle-down"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <MatComIcon
                name="email-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Email ID"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}
              onPress={() => refGenderRBSheet.current.open()}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="transgender"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
                <Text
                  style={{
                    paddingVertical: 0,
                    fontFamily: 'Poppins-Medium',
                    color: gender === null ? '#9e9e9e' : '#333',
                  }}>
                  {genderText === null ? 'Gender' : genderText}
                </Text>
              </View>
              <View>
                <FontAwesome
                  name="angle-down"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <MatComIcon
                name="email-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Religion"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={religion}
                onChangeText={text => setReligion(text)}
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}
              onPress={() => refLanguageRBSheet.current.open()}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="language"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
                <Text
                  style={{
                    paddingVertical: 0,
                    fontFamily: 'Poppins-Medium',
                    color: language === null ? '#9e9e9e' : '#333',
                  }}>
                  {language === null ? 'Language' : language}
                </Text>
              </View>
              <View>
                <FontAwesome
                  name="angle-down"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}
              onPress={() => refMaritalRBSheet.current.open()}>
              <View style={{flexDirection: 'row'}}>
                <MatComIcon
                  name="ring"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
                <Text
                  style={{
                    paddingVertical: 0,
                    fontFamily: 'Poppins-Medium',
                    color: maritalStatus === null ? '#9e9e9e' : '#333',
                  }}>
                  {maritalStatusText === null
                    ? 'Marital Status'
                    : maritalStatusText}
                </Text>
              </View>
              <View>
                <FontAwesome
                  name="angle-down"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}
              onPress={() => refEducationRBSheet.current.open()}>
              <View style={{flexDirection: 'row'}}>
                <MatComIcon
                  name="school-outline"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
                <Text
                  style={{
                    paddingVertical: 0,
                    fontFamily: 'Poppins-Medium',
                    color: education === null ? '#9e9e9e' : '#333',
                  }}>
                  {educationText === null ? 'Education' : educationText}
                </Text>
              </View>
              <View>
                <FontAwesome
                  name="angle-down"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <MaterialIcon
                name="work-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Job Type"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={employement}
                onChangeText={text => setEmployement(text)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <FontAwesome
                name="money"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Monthly Income"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={income}
                onChangeText={text => setIncome(text)}
              />
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
                name="home-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Address"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={address}
                onChangeText={text => setAddress(text)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <MaterialIcon
                name="location-city"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="City"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={city}
                onChangeText={text => setCity(text)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <MatComIcon
                name="city-variant"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="State"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={state}
                onChangeText={text => setState(text)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#FF0083',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <MatComIcon
                name="google-maps"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Pin Code"
                style={{
                  flex: 1,
                  paddingVertical: 0,
                  fontFamily: 'Poppins-Medium',
                }}
                value={pincode}
                onChangeText={text => setPincode(text)}
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
                  RegisterDetails();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Medium',
                    color: '#fff',
                    fontSize: 16,
                  }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      <RBSheet
        ref={refGenderRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            backgroundColor: '#FF0083',
          },
        }}>
        <GenderComponent />
      </RBSheet>

      <DatePicker
        modal
        mode="date"
        open={dobOpen}
        date={dob}
        onConfirm={date => {
          setDobOpen(false);
          setDob(date);
        }}
        onCancel={() => {
          setDobOpen(false);
        }}
      />

      <RBSheet
        ref={refMaritalRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            backgroundColor: '#FF0083',
          },
        }}>
        <MaritalStatusComponent />
      </RBSheet>

      <RBSheet
        ref={refEducationRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            backgroundColor: '#FF0083',
          },
        }}>
        <EducationComponent />
      </RBSheet>

      <RBSheet
        ref={refLanguageRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            backgroundColor: '#FF0083',
          },
        }}>
        <LanguageComponent />
      </RBSheet>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
