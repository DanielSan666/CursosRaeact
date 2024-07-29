import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { register } from '../API/API'; // Ajusta la ruta según tu estructura de archivos

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const result = await register(username, email, password);
      if (result) {
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login'); 
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
          color="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          color="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
          secureTextEntry
          color="#000"
        />
        <Button title="Register" onPress={handleRegister} color="#6200ee" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Similar to LoginScreen
    paddingTop: 50, // Similar to LoginScreen
  },
  card: {
    width: '80%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#6200ee",
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
});

export default RegisterScreen;
