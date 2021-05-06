// Navigation/Navigation.js
import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductScreen from '../screens/ProductsScreen';
import HomeLog from './HomeLogNav'




const SideNavLogged = createDrawerNavigator();
export default function DrawerLogNav() {
  return (
  <SideNavLogged.Navigator>
    <SideNavLogged.Screen name='Home Logged' component={HomeLog}/>
    <SideNavLogged.Screen name="Account" component={ProductScreen} />
  </SideNavLogged.Navigator>
  );
}



  