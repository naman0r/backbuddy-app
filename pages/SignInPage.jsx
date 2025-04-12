// pages/SignInPage.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust the path if needed

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password cannot be empty.");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is signed in
        // AuthContext listener will handle navigation
        console.log("Signed in successfully:", userCredential.user.email);
        // setLoading(false); // Not strictly needed as component unmounts
      })
      .catch((error) => {
        setLoading(false);
        // Handle specific errors like wrong password or user not found
        let errorMessage = "An unknown error occurred.";
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential"
        ) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Please enter a valid email address.";
        } else {
          errorMessage = error.message; // Default Firebase error
        }
        Alert.alert("Sign In Error", errorMessage);
      });
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp"); // Navigate to the SignUp screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Navigation to Sign Up */}
      <TouchableOpacity style={styles.signUpLink} onPress={navigateToSignUp}>
        <Text style={styles.signUpText}>
          Don't have an account?{" "}
          <Text style={styles.signUpLinkText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInPage;

// Use similar styling as SignUpPage for consistency
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Light background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 40,
  },
  input: {
    width: "90%",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#495057",
  },
  button: {
    width: "90%",
    backgroundColor: "#0057e7", // Theme blue
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20, // Add space below button
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpLink: {
    marginTop: 15,
  },
  signUpText: {
    fontSize: 14,
    color: "#6c757d",
  },
  signUpLinkText: {
    color: "#0057e7", // Theme blue
    fontWeight: "bold",
  },
});
