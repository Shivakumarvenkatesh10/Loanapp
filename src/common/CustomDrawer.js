import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../context/AuthContext';

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#FF0083'}}>
        <ImageBackground
          source={require('../assets/images/hot-pink.png')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/images/user.jpeg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
            }}>
            John
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Medium',
              }}>
              amount
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.customText}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={styles.bottomContainer}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={styles.bottomText}>Our Custom Text</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{paddingVertical: 15}}>
          <View style={styles.bottomContainer}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={styles.bottomText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    padding: 20,
  },
  userImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameStyle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },
  phoneStyle: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    marginRight: 5,
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItem: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  customText: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
