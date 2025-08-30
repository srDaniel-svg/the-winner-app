import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

// Import all images explicitly
const images = [
  require('../assets/images/ena1/001.png'),
  require('../assets/images/ena1/002.png'),
  require('../assets/images/ena1/003.png'),
  require('../assets/images/ena1/004.png'),
  require('../assets/images/ena1/005.png'),
  require('../assets/images/ena1/006.png'),
  require('../assets/images/ena1/007.png'),
  require('../assets/images/ena1/008.png'),
  require('../assets/images/ena1/009.png'),
];

export default function EnaAnimation() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 150); // Ajusta la velocidad de la animación aquí (ej: 150ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={images[currentImageIndex]} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
