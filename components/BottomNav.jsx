import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialCommunityIcons name="home-outline" size={28} color="black" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Goals")}
      >
        <MaterialCommunityIcons name="target" size={28} color="black" />
        <Text style={styles.navText}>Goals</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Connect")}
      >
        <MaterialCommunityIcons
          name="bluetooth-connect"
          size={28}
          color="black"
        />
        <Text style={styles.navText}>Connect</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <MaterialCommunityIcons
          name="account-outline"
          size={28}
          color="black"
        />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Settings")}
      >
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={28}
          color="black"
        />
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e6863b", // Orange background
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
});

export default BottomNav;
