import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import DeviceInfo from 'react-native-device-info';

const TermsAndCondition = ({mobile, userId, navigation}) => {
  console.log(mobile, userId);
  console.log(DeviceInfo.getUniqueId());
  const {login} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0083" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              color: '#333',
              fontSize: 18,
              marginVertical: 20,
            }}>
            Terms And Condition
          </Text>
          <ScrollView>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
              }}>
              In finance, a loan is the transfer of money by one party to
              another with an agreement to pay it back. The recipient, or
              borrower, incurs a debt and is usually required to pay interest
              for the use of the money. The document evidencing the debt (e.g.,
              a promissory note) will normally specify, among other things, the
              principal amount of money borrowed, the interest rate the lender
              is charging, and the date of repayment. A loan entails the
              reallocation of the subject asset(s) for a period of time, between
              the lender and the borrower.
            </Text>
          </ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                login(mobile, userId);
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                }}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: '#000'}]}
              onPress={() => navigation.navigate('Onboard')}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                }}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  buttonStyle: {
    width: '47%',
    marginTop: 20,
    backgroundColor: '#FF0083',
    padding: 15,
    borderRadius: 30,
  },
});
