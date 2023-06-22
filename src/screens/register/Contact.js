import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {base_url} from '../../common/Api';

const Contact = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [accNo, setAccNo] = useState(null);
  const [IFSC, setIFSC] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(res => {
      setUserId(res);
    });
  }, []);

  const saveAccDet = async () => {
    setLoading(true);
    await axios
      .post(base_url + 'Account/bank/create', {
        userId: userId,
        accountNumber: accNo,
        name: name,
        ifscCode: IFSC,
      })
      .then(res => {
        if (res.status === 200) {
          alert('Data Saved Successfully');
        } else {
          alert('Something Went wrong');
          setLoading(false);
          return;
        }
      });
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
              name="bank"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="Account Number"
              style={{
                flex: 1,
                paddingVertical: 0,
                fontFamily: 'Poppins-Medium',
              }}
              value={accNo}
              onChangeText={text => setAccNo(text)}
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
              name="code"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="IFSC Code"
              style={{
                flex: 1,
                paddingVertical: 0,
                fontFamily: 'Poppins-Medium',
              }}
              value={IFSC}
              onChangeText={text => setIFSC(text)}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#FF0083',
              padding: 10,
              borderRadius: 30,
              marginBottom: 30,
            }}
            onPress={() => saveAccDet()}>
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

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
