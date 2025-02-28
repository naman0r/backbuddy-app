import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Switch } from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";

const Settings = () => {
  return (
    <>
      <TopNav />
      <View>
        <Text>Settings</Text>
      </View>
      <BottomNav />
    </>
  );
};

export default Settings;
