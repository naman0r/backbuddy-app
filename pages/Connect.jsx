import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [powerOn, setPowerOn] = useState(false);
  const [pressureValues, setPressureValues] = useState([0, 0, 0, 0]);

  React.useEffect(() => {
    let intervalId;
    if (isConnected && powerOn) {
      intervalId = setInterval(() => {
        setPressureValues(
          Array.from({ length: 4 }, () => Math.floor(Math.random() * 20) + 5)
        );
      }, 2000);
    } else if (isConnected && !powerOn) {
      setPressureValues([1, 1, 0, 2]);
    } else {
      setPressureValues([0, 0, 0, 0]);
    }

    return () => clearInterval(intervalId);
  }, [isConnected, powerOn]);

  const toggleConnection = () => {
    const newState = !isConnected;
    setIsConnected(newState);
    if (!newState) {
      setPowerOn(false);
    }
  };

  const togglePower = () => {
    if (isConnected) {
      setPowerOn(!powerOn);
    }
  };

  return (
    <>
      <TopNav name="BackBuddy" />
      <View style={styles.container}>
        <Text style={styles.title}>Device Connection</Text>

        <TouchableOpacity
          style={[
            styles.button,
            isConnected ? styles.disconnectButton : styles.connectButton,
          ]}
          onPress={toggleConnection}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isConnected ? "Disconnect" : "Connect to Device"}
          </Text>
        </TouchableOpacity>

        {isConnected && (
          <View style={styles.deviceInfoContainer}>
            <Text style={styles.statusText}>
              Status: <Text style={styles.connectedText}>Connected</Text>
            </Text>

            <View style={styles.controlRow}>
              <Text style={styles.label}>Device Power</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={powerOn ? "#0057e7" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglePower}
                value={powerOn}
              />
            </View>

            <View style={styles.pressureSection}>
              <Text style={styles.sectionTitle}>Sensor Readings</Text>
              <View style={styles.pressureGrid}>
                {pressureValues.map((value, index) => (
                  <View key={index} style={styles.pressureCell}>
                    <Text style={styles.pressureLabel}>Sensor {index + 1}</Text>
                    <Text style={styles.pressureValue}>{value} psi</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        {!isConnected && (
          <Text style={styles.statusText}>Status: Not Connected</Text>
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
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  connectButton: {
    backgroundColor: "#0057e7",
  },
  disconnectButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  deviceInfoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  statusText: {
    fontSize: 17,
    color: "#6c757d",
    marginVertical: 15,
    fontWeight: "500",
  },
  connectedText: {
    color: "#28a745",
    fontWeight: "bold",
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#495057",
  },
  pressureSection: {
    marginTop: 25,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    width: "95%",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 20,
  },
  pressureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  pressureCell: {
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    minWidth: "45%",
    marginBottom: 15,
    marginHorizontal: 5,
  },
  pressureLabel: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
  },
  pressureValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057e7",
  },
});
