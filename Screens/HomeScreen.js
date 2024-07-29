import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal, Animated, Dimensions, Image, Button, Alert, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const icons = {
  menu: require('../assets/img/menu.png'),
  user: require('../assets/img/user.png'),
  home: require('../assets/img/home.png'),
  add: require('../assets/img/add.png')
};

const HomeScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get('window').width;

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`http://192.168.1.226:5000/api/courses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useFocusEffect(
    useCallback(() => {
      fetchCourses();
    }, [fetchCourses])
  );

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const drawerTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, 0], // Adjusting the output range for left drawer
  });

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Cierre de Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, cerrar sesión',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.1.226:5000/api/logout`, {
                method: 'POST',
                credentials: 'include',
              });
  
              if (response.ok) {
                Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
                navigation.navigate('Login');
              } else {
                console.error("Logout error: Unexpected status", response.status);
              }
            } catch (error) {
              console.error("Logout error:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
        <Image source={icons.menu} style={styles.menuIcon} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course._id}
            style={styles.card}
            onPress={() => navigation.navigate('Course', { courseId: course._id, courseTitle: course.title })}
          >
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.description}>{course.description}</Text>
            <Text style={styles.duration}>Duration: {course.duration} hours</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={drawerOpen} transparent={true} animationType="none">
        <TouchableOpacity onPress={closeDrawer} style={styles.overlay} />
        <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
          <View style={styles.drawerContent}>
            <TouchableOpacity onPress={() => { navigation.navigate('Home'); closeDrawer(); }} style={styles.drawerItem}>
              <Image source={icons.home} style={styles.drawerIcon} />
              <Text style={styles.drawerLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Profile'); closeDrawer(); }} style={styles.drawerItem}>
              <Image source={icons.user} style={styles.drawerIcon} />
              <Text style={styles.drawerLabel}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('AddCourse'); closeDrawer(); }} style={styles.drawerItem}>
              <Image source={icons.add} style={styles.drawerIcon} />
              <Text style={styles.drawerLabel}>Course</Text>
            </TouchableOpacity>
            <View style={styles.logoutContainer}>
              <Button title="Logout" onPress={handleLogout} color="#d9534f" />
            </View>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: '#6200ee',
    padding: 8,
    borderRadius: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  scrollViewContent: {
    paddingTop: 60, // Adding paddingTop to move the cards down
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  drawerIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  drawerLabel: {
    fontSize: 18,
    color: '#000',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
