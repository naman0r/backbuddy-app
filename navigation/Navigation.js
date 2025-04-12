// Navigation.js
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import Auth context
import { AuthProvider, useAuth } from "../context/AuthContext";

import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import Goals from "../pages/Goals.jsx";
import Connect from "../pages/Connect.jsx";
import Settings from "../pages/Settings.jsx";

const Stack = createNativeStackNavigator();

// Define the navigation logic component
const AppNavigationLogic = () => {
  const { currentUser, loading } = useAuth(); // Get user and loading state from context

  if (loading) {
    // Show loading indicator while checking auth state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0057e7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          // User is signed in: Show main app stack
          <>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Goals" component={Goals} />
            <Stack.Screen name="Connect" component={Connect} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        ) : (
          // No user signed in: Show auth stack
          <>
            <Stack.Screen name="SignIn" component={SignInPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Main App Navigator component wraps logic with the provider
const AppNavigator = () => {
  return (
    <AuthProvider>
      <AppNavigationLogic />
    </AuthProvider>
  );
};

export default AppNavigator;
