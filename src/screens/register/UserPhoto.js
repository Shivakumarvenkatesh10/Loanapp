import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const UserPhoto = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF0083',
            padding: 10,
            borderRadius: 30,
            marginBottom: 30,
          }}
          onPress={() => {
            navigation.navigate('Contact');
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
    </View>
  );
};

export default UserPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
