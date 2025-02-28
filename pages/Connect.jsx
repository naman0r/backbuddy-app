import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Switch } from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [powerOn, setPowerOn] = useState(false);
  const [pressureValues, setPressureValues] = useState([0, 0, 0, 0]);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      // Simulated connection setup
      setPressureValues([10, 15, 8, 12]); // Example pressure values
    } else {
      setPressureValues([0, 0, 0, 0]);
    }
  };

  const togglePower = () => {
    setPowerOn(!powerOn);
  };

  return (
    <>
      <TopNav name="BackBuddy" />
      <View style={styles.container}>
        <Text style={styles.title}>Connect to BackBuddy</Text>

        <Button
          title={isConnected ? "Disconnect" : "Connect to Device"}
          onPress={toggleConnection}
          color={isConnected ? "red" : "green"}
        />

        {isConnected && (
          <>
            <Text style={styles.statusText}>Device Connected</Text>

            <View style={styles.switchContainer}>
              <Text style={styles.label}>Power</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#e6863b" }}
                thumbColor={powerOn ? "#fff" : "#f4f3f4"}
                onValueChange={togglePower}
                value={powerOn}
              />
            </View>

            <View style={styles.pressureContainer}>
              <Text style={styles.label}>Pressure Values</Text>
              {pressureValues.map((value, index) => (
                <Text key={index} style={styles.pressureText}>
                  Sensor {index + 1}: {value} psi
                </Text>
              ))}
            </View>
          </>
        )}
      </View>
      <BottomNav />
    </>
  );
};

export default Connect;

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
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    color: "green",
    marginVertical: 10,
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
  pressureContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    width: "80%",
  },
  pressureText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
