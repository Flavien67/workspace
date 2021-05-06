// Navigation/Navigation.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeLoggedScreen from '../screens/HomeLoggedScreen';
import ProductScreen from '../screens/ProductsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
export default function HomeLogNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={HomeLoggedScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Messages" component={ProductScreen} options={{
          tabBarLabel: 'Produits',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sale" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}
