import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import TopNav from "../components/TopNav.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import icons
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { signOut } from "firebase/auth"; // Import signOut for logout
import { auth } from "../firebase"; // Import auth for signOut

// Removed dummy user data
// const user = { ... };

const ProfilePage = ({ navigation }) => {
  const { currentUser } = useAuth(); // Get user from context

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigation logic will automatically handle redirect to SignIn page
      // because the onAuthStateChanged listener in AuthContext will update currentUser to null.
      console.log("User signed out");
    } catch (error) {
      console.error("Logout Error:", error);
      // Optionally show an alert to the user
      Alert.alert("Logout Failed", "An error occurred during sign out.");
    }
  };

  const profileOptions = [
    {
      title: "Edit Profile",
      icon: "account-edit-outline",
      action: () => console.log("Navigate to Edit Profile"),
    },
    {
      title: "Notifications",
      icon: "bell-outline",
      action: () => console.log("Navigate to Notifications"),
    },
    {
      title: "Appearance",
      icon: "palette-outline",
      action: () => console.log("Navigate to Appearance"),
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      action: () => console.log("Navigate to Help"),
    },
    // Updated Logout action
    { title: "Logout", icon: "logout", action: handleLogout, color: "#dc3545" },
  ];

  // Handle case where currentUser might be null briefly (though context/nav should prevent this view)
  if (!currentUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0057e7" />
      </View>
    );
  }

  // Format join date from Firebase metadata
  const joinDate = currentUser.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Not available";

  return (
    <>
      <TopNav name="Profile" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {/* Check currentUser.photoURL instead of user.avatar */}
            {currentUser.photoURL ? (
              <Image
                source={{ uri: currentUser.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialCommunityIcons
                  name="account"
                  size={60}
                  color="#adb5bd"
                />
              </View>
            )}
          </View>
          {/* Use currentUser.displayName or email */}
          <Text style={styles.userName}>
            {currentUser.displayName || currentUser.email}
          </Text>
          {/* Use currentUser.email */}
          <Text style={styles.userEmail}>{currentUser.email}</Text>
          <Text style={styles.joinDate}>Joined: {joinDate}</Text>
        </View>

        {/* Menu container remains the same, but Logout action is updated */}
        <View style={styles.menuContainer}>
          {profileOptions.map((option, index) => {
            const isLastItem = index === profileOptions.length - 1;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, isLastItem && styles.lastMenuItem]}
                onPress={option.action}
                activeOpacity={0.6}
              >
                <MaterialCommunityIcons
                  name={option.icon}
                  size={24}
                  color={option.color || "#0057e7"}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuText,
                    option.color ? { color: option.color } : {},
                  ]}
                >
                  {option.title}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#adb5bd"
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <StatusBar style="auto" />
      </ScrollView>
      <BottomNav />
    </>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    // Added style for loading indicator
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 10,
  },
  joinDate: {
    fontSize: 14,
    color: "#adb5bd",
  },
  menuContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden", // Ensures border radius is applied to children
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e9ecef",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 15,
    width: 24, // Ensure icon takes up consistent space
    textAlign: "center",
  },
  menuText: {
    flex: 1, // Take remaining space
    fontSize: 17,
    color: "#495057",
    fontWeight: "500",
  },
});
