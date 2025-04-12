import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuth();
  const userName = currentUser?.displayName || currentUser?.email || "User";
  const [isPowerOn, setIsPowerOn] = useState(false);

  const togglePower = () => setIsPowerOn(!isPowerOn);

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <TopNav name={userName} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        {/* Today's Goal Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Goal</Text>
          <View style={styles.card}>
            <View style={styles.goalHeader}>
              <MaterialCommunityIcons
                name="target"
                size={24}
                color="#0057e7"
                style={styles.iconStyle}
              />
              <Text style={styles.goalTitleText}>Maintain Good Posture</Text>
            </View>
            <Text style={styles.goalDate}>{dateString}</Text>
            <Text style={styles.goalDescription}>
              Focus on sitting upright and keeping your shoulders relaxed
              throughout the day.
            </Text>
            <TouchableOpacity style={styles.startButton} activeOpacity={0.7}>
              <Text style={styles.startButtonText}>Track Session</Text>
              <MaterialCommunityIcons
                name="arrow-right-circle-outline"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Power Control Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Device Control</Text>
          <View style={[styles.card, styles.controlRow]}>
            <View style={styles.controlTextContainer}>
              <MaterialCommunityIcons
                name="power-plug-outline"
                size={24}
                color="#495057"
                style={styles.iconStyle}
              />
              <Text style={styles.controlLabel}>BackBuddy Power</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPowerOn ? "#0057e7" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglePower}
              value={isPowerOn}
            />
          </View>
        </View>

        {/* Progress Section (Placeholder) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={[styles.card, styles.progressCard]}>
            <MaterialCommunityIcons
              name="chart-line"
              size={24}
              color="#28a745"
              style={styles.iconStyle}
            />
            <Text style={styles.progressText}>
              Daily progress tracking coming soon!
            </Text>
          </View>
        </View>

        <StatusBar style="auto" />
      </ScrollView>

      <BottomNav />
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 15,
    marginLeft: 5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  iconStyle: {
    marginRight: 10,
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  goalTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057e7",
  },
  goalDate: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 12,
    marginLeft: 34,
  },
  goalDescription: {
    fontSize: 15,
    color: "#495057",
    lineHeight: 22,
    marginBottom: 20,
    marginLeft: 34,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0057e7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginLeft: 34,
  },
  startButtonText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
    marginRight: 8,
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controlTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#495057",
  },
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9f5ec",
  },
  progressText: {
    fontSize: 16,
    color: "#155724",
    fontWeight: "500",
    flexShrink: 1,
  },
});
