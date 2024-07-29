// AppNavigator.js
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import CourseScreen from '../Screens/CourseScreen';
import AddCourseScreen from '../Screens/AddCourseScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Course' component={CourseScreen} />
      <Stack.Screen name='AddCourse' component={AddCourseScreen} /> 

    </Stack.Navigator>
  );
}

export default AppNavigator;
