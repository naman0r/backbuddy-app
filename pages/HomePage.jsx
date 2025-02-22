import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";
import React, { useState } from "react";

const HomePage = ({ route, navigation }) => {
  const { userName } = route.params || {};
  const [loggedIn, changeLoginStatus] = useState(false);

  return (
    <>
      <TopNav name={userName || "User"} />
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate("Profile")} // Now `navigation` is accessible
        />
      </View>
      <BottomNav login={loggedIn} />
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
