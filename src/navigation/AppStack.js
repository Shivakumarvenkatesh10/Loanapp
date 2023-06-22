import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import CustomDrawer from '../common/CustomDrawer';
// import Loan from '../screens/dummy/Loan';
// import Profile from '../screens/dummy/Profile';
import BottomTabNavigator from './TabNavigator';

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'hotpink',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({size, color}) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Loan"
        component={Loan}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default AppStack;
