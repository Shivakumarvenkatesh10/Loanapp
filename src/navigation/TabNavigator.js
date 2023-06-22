import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/main/Home';
import LoanRepayment from '../screens/main/LoanRepayment';
import LoanRecord from '../screens/main/LoanRecord';
import HelpDesk from '../screens/main/HelpDesk';
import UserProfile from '../screens/profile/UserProfile';
import Register from '../screens/register/Register';
import Aadhaar from '../screens/register/Aadhaar';
import Pan from '../screens/register/Pan';
import UserPhoto from '../screens/register/UserPhoto';
import Contact from '../screens/register/Contact';
import EmergencyContact from '../screens/register/EmergencyContact';
import DispatchScreen from '../screens/loan/DispatchScreen';
import Loader from '../common/Loader';

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#FF0083'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Aadhaar"
        component={Aadhaar}
        options={{
          headerShown: true,
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="Pan"
        component={Pan}
        options={{
          headerShown: true,
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="UserPhoto"
        component={UserPhoto}
        options={{
          headerShown: true,
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: true,
          title: 'Contact Information',
        }}
      />
      <Stack.Screen
        name="EmergencyContact"
        component={EmergencyContact}
        options={{
          headerShown: true,
          title: 'Emergency Contact',
        }}
      />
      <Stack.Screen
        name="DispatchScreen"
        component={DispatchScreen}
        options={{
          headerShown: false,
          title: 'Dispatch Amount',
        }}
      />
      <Stack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
          title: 'Loader',
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarActiveTintColor: '#FF0083',
        tabBarInactiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="Home2"
        component={StackNavigator}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisiBility(route),
          },
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="home" color={color} size={size} />;
          },
          tabBarBadgeStyle: {backgroundColor: 'yellow'},
        })}
      />

      <Tab.Screen
        name="LoanRepayment"
        component={LoanRepayment}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => {
            return <Icon name="wallet" color={color} size={size} />;
          },
        })}
      />

      <Tab.Screen
        name="LoanRecord"
        component={LoanRecord}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="pie-chart" color={color} size={size} />;
          },
        })}
      />

      <Tab.Screen
        name="HelpDesk"
        component={HelpDesk}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="grid" color={color} size={size} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisiBility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  console.log(routeName);
  if (routeName === 'Home' || routeName === 'Feed') {
    return 'flex';
  }
  return 'none';
};

export default BottomTabNavigator;
