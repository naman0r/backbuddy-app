// Navigation.js
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed

import SignInPage from "../pages/SignInPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import Goals from "../pages/Goals.jsx";
import Connect from "../pages/Connect.jsx";
import Settings from "../pages/Settings.jsx";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // clean up on unmount
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Goals" component={Goals} />
            <Stack.Screen name="Connect" component={Connect} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        ) : (
          <Stack.Screen name="SignIn" component={SignInPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
