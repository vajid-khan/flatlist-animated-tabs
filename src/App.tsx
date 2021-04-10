import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import * as Screens from './screens'

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Tab FlastList" openByDefault>
                <Drawer.Screen name="Tab FlastList" component={Screens.TabBarFlatListScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}