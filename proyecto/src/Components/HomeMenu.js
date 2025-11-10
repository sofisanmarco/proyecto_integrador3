import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screens/Home";
import NuevoPost from "../Screens/NuevoPost";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Profile from "../Screens/Profile";
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator()

function HomeMenu(){
    return(
       
        <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
            <Tab.Screen name='Home' component={HomeStack} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
            <Tab.Screen name='Post' component={NuevoPost} options={{headerShown: false, tabBarIcon: () => <Entypo name="circle-with-plus" size={24} color="black" />}}/>
            <Tab.Screen name="Profile" component={Profile} options={ { headerShown:false, tabBarIcon: () => <Ionicons name="person" size={24} color="black" /> }}  />
        </Tab.Navigator>
    )
}

export default HomeMenu;