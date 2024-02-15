import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import HomeNavigation from '../Navigations/HomeNavigation'
import BookingNavigation from './BookingNavigation';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
    }
    }>
      <Tab.Screen name="Home" component={HomeNavigation} options={{
        tabBarLabel: ({color})=> {
            return <Text style={{fontSize: 13, color: color, marginBottom: 4}}>
                Home
            </Text>
        },
        tabBarIcon: ({color, size}) => (<Ionicons name="home" size={22} color={color} style={{marginTop: 4}}/>)
        
      }}/>
      <Tab.Screen name="Booking" component={BookingNavigation} options={{
        tabBarLabel: ({color})=> {
            return <Text style={{fontSize: 13, color: color, marginBottom: 4}}>
                Booked Services
            </Text>
        },
        tabBarIcon: ({color, size}) => (<Ionicons name="bookmarks-sharp" size={22} color={color} style={{marginTop: 4}}/>)
        
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: ({color})=> {
            return <Text style={{fontSize: 13, color: color, marginBottom: 4}}>
                Profile
            </Text>
        },
        tabBarIcon: ({color, size}) => (<FontAwesome name="user" size={size} color={color} style={{marginTop: 4}} />)
        
      }} />
    </Tab.Navigator>
  );
}

export default TabNavigation