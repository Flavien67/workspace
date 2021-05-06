// Navigation/Navigation.js
import * as React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { translate } from "../locale/local";

const Tab_2 = createMaterialBottomTabNavigator();
export default function HomeUnlogNav({route}) {
  return (
    <Tab_2.Navigator
    
      // labelStyle={{ fontSize: 50 }}
      activeColor="#4e695a"
      inactiveColor="#4e695a55"
      barStyle={{ backgroundColor: '#73c692bb' }}

      // style={{ backgroundColor: 'red', height: '50%', }}
    >
      <Tab_2.Screen name="Home" component={HomeScreen} options={{
          
          
          tabBarLabel: translate('BOTTOM_TAB_HOME'),
          
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),

        }}/>
      <Tab_2.Screen name="Messages" component={ShopScreen} options={{
          tabBarLabel: translate('BOTTOM_TAB_COM'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={20} />
          ),
          
        }}/>
    </Tab_2.Navigator>
  );
}
