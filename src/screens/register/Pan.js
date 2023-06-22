import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Pan = ({navigation}) => {
  const [pan, setPan] = useState(null);
  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#FF0083',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Icon
            name="document-text-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
            placeholder="Pan Number"
            style={{
              flex: 1,
              paddingVertical: 0,
              fontFamily: 'Poppins-Medium',
            }}
            value={pan}
            onChangeText={text => setPan(text)}
            keyboardType="number-pad"
            maxLength={16}
          />
        </View>

        <View>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              color: '#333',
              fontSize: 16,
            }}>
            Upload Front Image of Pan Card
          </Text>

          <TouchableOpacity style={{marginVertical: 20}}>
            <Text>Open</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#FF0083',
            padding: 10,
            borderRadius: 30,
            marginBottom: 30,
          }}
          onPress={() => {
            navigation.navigate('UserPhoto');
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

export default Pan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  touch: {
    backgroundColor: '#000',
    borderRadius: 25,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    padding: 10,
    textAlign: 'center',
  },
});
