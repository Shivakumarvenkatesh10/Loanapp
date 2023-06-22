import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthContext} from '../context/AuthContext';
import BottomTabNavigator from './TabNavigator';

import {NavigationContainer} from '@react-navigation/native';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#FF0083" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
