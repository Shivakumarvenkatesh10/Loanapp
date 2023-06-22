import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({name}) => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 24,
          color: '#fff',
          fontFamily: 'Roboto-Medium',
        }}>
        {name}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
