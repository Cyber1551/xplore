import React from 'react';

import {createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigator from "./StackNavigator";

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name={'default'} component={StackNavigator} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
