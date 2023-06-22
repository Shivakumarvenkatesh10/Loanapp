import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {base_url} from '../../common/Api';
import axios from 'axios';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const HelpDesk = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getHelpDeskDet();
  }, []);

  const getHelpDeskDet = async () => {
    await axios.get(base_url + `DashBoard/helpdesk`).then(res => {
      if (res.data.success) {
        setPhone(res.data.result.phoneNumber);
        setEmail(res.data.result.email);
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
        <View style={{flex: 1}}>
          <View style={styles.TopTextContainer}>
            <Text style={styles.headertext}>Help Desk</Text>
            <View style={{flexDirection: 'row'}}></View>
          </View>

          <View
            style={{
              height: SCREEN_HEIGHT * 0.7,
              width: SCREEN_WIDTH,
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 10,
            }}>
            <ScrollView>
              <View
                style={{
                  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 3,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 15,
                  margin: 10,
                }}>
                <Text style={{color: '#666', fontFamily: 'Poppins-Medium'}}>
                  <FontAwesome name="phone" size={15} color="#666" /> +91{' '}
                  {phone}
                </Text>
              </View>
              <View
                style={{
                  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 3,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 15,
                  margin: 10,
                }}>
                <Text style={{color: '#666', fontFamily: 'Poppins-Medium'}}>
                  <Icon name="email" size={15} color="#666" /> {email}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default HelpDesk;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FF0083'},
  TopTextContainer: {flex: 1, alignItems: 'center', paddingTop: 20},
  headertext: {fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 30},
});
