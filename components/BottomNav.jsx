import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navItems = [
    { name: "Home", icon: "home-outline", iconFocused: "home" },
    { name: "Goals", icon: "target", iconFocused: "target" },
    {
      name: "Connect",
      icon: "bluetooth-connect",
      iconFocused: "bluetooth-connect",
    },
    { name: "Profile", icon: "account-outline", iconFocused: "account" },
    {
      name: "Settings",
      icon: "dots-horizontal",
      iconFocused: "dots-horizontal",
    },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = route.name === item.name;
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.name)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={isActive ? item.iconFocused : item.icon}
              size={isActive ? 28 : 26}
              color={
                isActive ? styles.activeColor.color : styles.inactiveColor.color
              }
            />
            <Text
              style={[
                styles.navText,
                isActive ? styles.activeColor : styles.inactiveColor,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#d3d3d3",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontSize: 11,
    marginTop: 2,
  },
  activeColor: {
    color: "#0057e7",
    fontWeight: "600",
  },
  inactiveColor: {
    color: "#6c757d",
    fontWeight: "400",
  },
});

export default BottomNav;
