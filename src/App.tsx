import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import * as Screens from './screens'
import { StatusBar } from 'react-native';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <>
        <StatusBar hidden/>
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Tab FlastList" component={Screens.TabBarFlatListScreen} />
                <Drawer.Screen name="Flip" component={Screens.FlipScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
        </>
    );
}