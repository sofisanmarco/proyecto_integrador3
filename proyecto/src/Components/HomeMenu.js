import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screens/Home";
const Tab = createBottomTabNavigator()

function HomeMenu(){
    <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
        <Tab.Screen name='Home' component={Home} options={{headerShown: false}}/>
    </Tab.Navigator>
}

export default HomeMenu;