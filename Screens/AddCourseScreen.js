import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddCourseScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddCourse = async () => {
    try {
      const response = await fetch(`http://192.168.1.226:5000/api/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, duration }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Course added successfully');
        navigation.goBack(); // Navigate back to HomeScreen
      } else {
        throw new Error('Failed to add course');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter course title"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter course description"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Duration (hours):</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Enter course duration"
        placeholderTextColor="#888"
      />
      <Button title="Agregar" onPress={handleAddCourse} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#000', // Text color set to black
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    color: '#000', // Text color set to black
    borderRadius: 8, // Rounded corners
  },
});

export default AddCourseScreen;
