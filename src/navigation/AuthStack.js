import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboard from '../screens/login/Onbording';
import Login from '../screens/login/Login';
import Otpscreen from '../screens/login/Otpscreen';
import TermsAndCondition from '../screens/login/TermsAndCondition';
import BottomSheet from '../screens/login/BottomSheet';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={Otpscreen} />
      {/* <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} /> */}
      <Stack.Screen name="BottomSheet" component={BottomSheet} />
    </Stack.Navigator>
  );
};

export default AuthStack;
