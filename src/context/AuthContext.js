import {StyleSheet} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [mobileno, setMobileno] = useState(null);

  const login = (mobile, userId) => {
    setIsLoading(true);
    setUserToken(userId);
    setMobileno(mobile);
    AsyncStorage.setItem('mobileno', mobile);
    AsyncStorage.setItem('userToken', userId);
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setMobileno(null);
    AsyncStorage.removeItem('mobileno');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let mobile = await AsyncStorage.getItem('mobileno');
      let userToken = await AsyncStorage.getItem('userToken');
      setMobileno(mobile);
      setUserToken(userToken);
      setIsLoading(false);
    } catch (err) {
      console.log(`isLoggedIn Error ${err}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, mobileno}}>
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});
