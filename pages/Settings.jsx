import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Switch,
  TextInput,
} from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [postureAlerts, setPostureAlerts] = useState(false);
  const [recapFrequency, setRecapFrequency] = useState("daily");

  return (
    <>
      <TopNav name="Settings" />
      <View style={styles.container}>
        <Text style={styles.title}>Email Notifications</Text>
        <Text style={styles.description}>
          Enter your email to receive posture alerts and recaps.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Posture Alerts</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#e6863b" }}
            thumbColor={postureAlerts ? "#fff" : "#f4f3f4"}
            onValueChange={() => setPostureAlerts(!postureAlerts)}
            value={postureAlerts}
          />
        </View>

        <Text style={styles.label}>Recap Frequency</Text>
        <View style={styles.buttonGroup}>
          {["daily", "weekly", "monthly"].map((option) => (
            <Button
              key={option}
              title={option.charAt(0).toUpperCase() + option.slice(1)}
              color={recapFrequency === option ? "#e6863b" : "gray"}
              onPress={() => setRecapFrequency(option)}
            />
          ))}
        </View>

        <Button
          title="Save Settings"
          onPress={() => alert("Settings saved!")}
          color="#e6863b"
        />
      </View>
      <BottomNav />
    </>
  );
};

export default Settings;

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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 10,
  },
});
