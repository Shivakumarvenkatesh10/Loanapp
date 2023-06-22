import {Dimensions, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const LoanRecord = () => {
  return (
    <View style={styles.container}>
      <View style={styles.TopTextContainer}>
        <Text style={styles.headertext}>Loan Record</Text>
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
            <Text style={{color: 'green', fontFamily: 'Poppins-Medium'}}>
              <FontAwesome name="rupee" size={15} color="green" />
              6000
            </Text>
            <Text style={{color: 'green', fontFamily: 'Poppins-Medium'}}>
              Borrowed Date: 08/02/2023
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoanRecord;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FF0083'},
  TopTextContainer: {flex: 1, alignItems: 'center', paddingTop: 20},
  headertext: {fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 30},
});
