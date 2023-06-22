import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {base_url} from '../../common/Api';

const EmergencyContact = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [relationShip, setRelationShip] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(res => {
      setUserId(res);
    });
  }, []);

  const saveEmergencyConatct = async () => {
    setLoading(true);
    await axios
      .post(base_url + 'Account/emergencycontact/create', {
        userId: userId,
        relationShip: relationShip,
        name: name,
        phoneNumber: phoneNumber,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0083" />
        </View>
      ) : (
        <View style={{margin: 20}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#FF0083',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <FontAwesome
              name="user-o"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="Name"
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
            <FontAwesome
              name="group"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="Relationship"
              style={{
                flex: 1,
                paddingVertical: 0,
                fontFamily: 'Poppins-Medium',
              }}
              value={relationShip}
              onChangeText={text => setRelationShip(text)}
              keyboardType="number-pad"
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
              name="mobile-phone"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="Phone number"
              style={{
                flex: 1,
                paddingVertical: 0,
                fontFamily: 'Poppins-Medium',
              }}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              maxLength={10}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#FF0083',
              padding: 10,
              borderRadius: 30,
              marginBottom: 30,
            }}
            onPress={() => saveEmergencyConatct()}>
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
      )}
    </View>
  );
};

export default EmergencyContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
