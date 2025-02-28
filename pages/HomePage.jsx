import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Switch,
} from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomePage = ({ route, navigation }) => {
  const { userName } = route.params || {};
  const [isPowerOn, setIsPowerOn] = useState(false);

  return (
    <>
      <TopNav name={userName || "User"} />
      <View style={styles.container}>
        {/* Today's Goal Section */}
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Today's Goal</Text>
          <View style={styles.goalCard}>
            <Text style={styles.goalText}>Good posture goals</Text>
            <Text style={styles.goalDate}>Friday, Jul 31</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startText}>Start</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Power Toggle Section */}
        <Text style={styles.sectionTitle}>Power On</Text>
        <View style={styles.powerContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#e6863b" }}
            thumbColor={isPowerOn ? "#fff" : "#f4f3f4"}
            onValueChange={() => setIsPowerOn(!isPowerOn)}
            value={isPowerOn}
          />
        </View>

        {/* Progress Section */}
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.progressBox} />
      </View>

      <BottomNav />
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  goalContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  goalCard: {
    backgroundColor: "#d9d9d9",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  goalDate: {
    fontSize: 14,
    color: "gray",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6863b",
    padding: 10,
    borderRadius: 5,
  },
  startText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  powerContainer: {
    backgroundColor: "#444",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  progressBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    height: 100,
  },
});
