import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { login } from "../API/API";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log('Attempting to log in with:', { email, password });
    const success = await login(email, password);
    console.log('Login success:', success);

    if (success) {
        Alert.alert("Login Successful", "You have successfully logged in!");
      navigation.navigate("Home");
    } else {
      Alert.alert("Login failed", "Invalid email or password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
          color="#000" // Ajusta el color del texto aquí
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
          color="#000" // Ajusta el color del texto aquí
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#6200ee" />
          <View style={styles.buttonSpacer}>
            <Button title="Register" onPress={() => navigation.navigate('Register')} color="#6200ee" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  card: {
    width: "80%",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#6200ee",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonSpacer: {
    marginTop: 10,
  },
});

export default LoginScreen;
