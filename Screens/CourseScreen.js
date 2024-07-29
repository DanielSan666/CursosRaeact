import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

// Mapeo de títulos de cursos a imágenes y descripciones
const courseImages = {
  'Curso de React': require('../assets/img/Js.png'),
  'Curso de Python': require('../assets/img/Python.jpg'),
  'Curso de C++': require('../assets/img/Cpp.png'),
  'Ruby': require('../assets/img/Ruby.png'),
  'TypeScript': require('../assets/img/TypeScript.png'),
  // Agrega más cursos e imágenes aquí según sea necesario
};

const courseDescriptions = {
  'Curso de Python': '🚀 **¡Transforma tu Carrera con Nuestro Curso de Python!**\n\nAprende uno de los lenguajes de programación más populares y versátiles. Ideal para desarrollo web, ciencia de datos, inteligencia artificial y más. Este curso te llevará de principiante a experto con proyectos reales y apoyo continuo.',
  'Curso de React': '🌟 **Domina el Desarrollo Frontend con React!**\n\nCrea interfaces de usuario interactivas y dinámicas, gestionando el estado y la lógica de aplicaciones modernas. Aprende de los expertos y construye un portafolio impresionante.',
  'Curso de C++': '🏆 **Adéntrate en el Mundo del Desarrollo con C++!**\n\nAprende conceptos avanzados y aplica C++ en proyectos reales, desde aplicaciones de alto rendimiento hasta sistemas embebidos. Perfecto para quienes buscan desafíos técnicos.',
  'Ruby': '🛠️ **Descubre el Poder de Ruby y Rails!**\n\nSumérgete en el desarrollo web con Ruby y el popular framework Rails. Aprende a construir aplicaciones web rápidas y eficientes con una sintaxis elegante y poderosa. Ideal para desarrolladores que buscan simplicidad y productividad en sus proyectos.',
  'TypeScript': '🚀 **Impulsa tu Desarrollo con TypeScript!**\n\nMejora tus habilidades de JavaScript con TypeScript, el superset que añade tipado estático a tu código. Aprende a escribir código más seguro y mantenible, y aprovecha al máximo las herramientas modernas de desarrollo para construir aplicaciones robustas y escalables.'
};

const CourseScreen = ({ route }) => {
  const { courseTitle } = route.params || {};

  // Obtén la imagen y la descripción correspondiente al título del curso
  const imageSource = courseImages[courseTitle];
  const description = courseDescriptions[courseTitle] || 'No description available';

  return (
    <View style={styles.container}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <Text style={styles.text}>Curso: {courseTitle}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20, // Padding horizontal para evitar que el texto toque los bordes
  },
  text: {
    fontSize: 20,
    color: '#000',
    marginTop: 20,
    fontWeight: 'bold', // Negrita para el título del curso
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24, // Ajusta el espaciado entre líneas para mejorar la legibilidad
    paddingHorizontal: 10, // Padding horizontal para evitar que el texto toque los bordes
  },
});

export default CourseScreen;
