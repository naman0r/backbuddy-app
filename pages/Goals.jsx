import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";

const GoalsPage = ({ navigation }) => {
  const [goal, setGoal] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  const addGoal = () => {
    if (goal.trim() !== "") {
      setGoalsList([...goalsList, goal]);
      setGoal("");
    }
  };

  return (
    <>
      <TopNav name="User" />
      <View style={styles.container}>
        <Text style={styles.title}>Posture Improvement Goals</Text>
        <Text style={styles.description}>
          Set and track your posture correction goals while using BackBuddy.
          Connect your device to monitor progress in real-time.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your goal (e.g., Sit upright for 30 min)"
          value={goal}
          onChangeText={setGoal}
        />
        <Button title="Add Goal" onPress={addGoal} />

        <View style={styles.goalList}>
          {goalsList.map((g, index) => (
            <Text key={index} style={styles.goalItem}>
              • {g}
            </Text>
          ))}
        </View>

        <Button
          title="Connect to BackBuddy Device"
          onPress={() => alert("Bluetooth feature coming soon!")}
        />
      </View>
      <BottomNav />
    </>
  );
};

export default GoalsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  goalList: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  goalItem: {
    fontSize: 16,
    color: "#333",
  },
});
