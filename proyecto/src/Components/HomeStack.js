import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import ComentarPost from "../Screens/ComentarPost";

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="ComentarPost" component={ComentarPost} options={{ headerShown: false }} />
    </Stack.Navigator>
);
}

export default HomeStack;
