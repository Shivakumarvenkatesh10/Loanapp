import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const LoanRepayment = () => {
  const [utrno, setUtrno] = useState(null);

  const LoanRepaymentComponent = () => {
    return (
      <View style={{flex: 1, margin: 20}}>
        <ScrollView>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF0083',
              padding: 10,
              borderRadius: 30,
              marginBottom: 30,
            }}
            // onPress={() => {
            //   RegisterDetails();
            // }}
          >
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
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.TopTextContainer}>
        <Text style={styles.headertext}>Loan Repayment</Text>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            style={{padding: 7}}
            name="rupee"
            size={30}
            color="#fff"
          />
          <Text style={styles.headertext}>10, 000 Rs</Text>
        </View>
      </View>

      <View
        style={{
          height: SCREEN_HEIGHT * 0.7,
          width: SCREEN_WIDTH,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View style={{padding: 20, alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#333',
              backgroundColor: 'lightgrey',
              padding: 10,
              width: '100%',
              textAlign: 'center',
              fontSize: 16,
            }}>
            UPI ID: 123456789@ybl
          </Text>
        </View>

        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#FF0083',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <Icon
              name="checkmark-done"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="UTR No."
              style={{
                flex: 1,
                paddingVertical: 0,
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}
              value={utrno}
              onChangeText={text => setUtrno(text)}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#FF0083',
              padding: 10,
              borderRadius: 30,
              marginBottom: 30,
              width: '100%',
            }}
            onPress={() => {
              // uploadAadhaar();
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                fontSize: 16,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoanRepayment;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FF0083'},
  TopTextContainer: {flex: 1, alignItems: 'center', paddingTop: 20},
  headertext: {fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 30},
});
