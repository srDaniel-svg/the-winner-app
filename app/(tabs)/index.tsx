// FILE: components/WalletScreen.tsx (orange theme + blobs + GIF abajo pequeño)
import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
  Animated,
  Easing,
} from 'react-native';

// --- Theme colors (match your mock) ---
const ORANGE = '#F97316'; // orange-500
const ORANGE_DARK = '#EA580C'; // orange-600
const ORANGE_LIGHT = '#FFE8D9';
const YELLOW = '#FACC15'; // yellow-400

// ----- Mini componente local para el GIF circular -----
const EnaLoading: React.FC<{ size?: number }> = ({ size = 88 }) => {
  return (
    <View style={[styles.enaWrap, { width: size, height: size, borderRadius: size / 2 }]}> 
      <Image
        source={require('./images/ena.gif')} // coloca el gif aquí: components/images/ena.gif
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
};

const WalletScreen: React.FC<{ onCreateAccount?: () => void; onLogin?: () => void; avatarUri?: string; }> = ({ onCreateAccount, onLogin, avatarUri }) => {
  // --- Animations ---
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(20)).current;
  const avatarScale = useRef(new Animated.Value(0.9)).current;
  const pulse = useRef(new Animated.Value(0)).current; // 0..1 loop

  useEffect(() => {
    Animated.sequence([
      Animated.delay(80),
      Animated.parallel([
        Animated.timing(fadeIn, { toValue: 1, duration: 450, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(slideUp, { toValue: 0, duration: 450, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
      Animated.spring(avatarScale, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 7 }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
  }, [fadeIn, slideUp, avatarScale, pulse]);

  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      {/* background blobs */}
      <BackgroundBlobs />

      <ScrollView contentContainerStyle={styles.scroll} bounces={false}>
        <Animated.View style={{ opacity: fadeIn, transform: [{ translateY: slideUp }], alignItems: 'center', width: '100%' }}>
          {/* Avatar con aro naranja */}
          <View style={styles.avatarWrap}>
            <Animated.View pointerEvents="none" style={[styles.pulseRing, { transform: [{ scale: pulseScale }], opacity: pulseOpacity }]} />
            <View style={styles.avatarBorder}>
              <Animated.Image
                source={{ uri: avatarUri || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=240&fit=crop' }}
                style={[styles.avatar, { transform: [{ scale: avatarScale }] }]}
              />
            </View>
          </View>

          {/* Title & subtitle */}
          <Animated.Text style={[styles.title, { opacity: fadeIn }]}>TransBolivia</Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: fadeIn }]}>
            paga tu paputransporte en tu papubilletera mobil para paputransportes :V
          </Animated.Text>

          {/* Botones */}
          <View style={styles.actions}>
            <AnimatedButton label="Crear Cuenta" variant="primary" onPress={onCreateAccount} />
            <AnimatedButton label="Iniciar Sesion" variant="outline" onPress={onLogin} />
          </View>

          {/* GIF abajo (pequeño, centrado) */}
          <View style={styles.bottomGifArea}>
            <EnaLoading size={88} />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

// --- Background decorative circles like your mock ---
const BackgroundBlobs = () => (
  <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <View style={[styles.blob, { top: -28, left: -28, backgroundColor: ORANGE, width: 90, height: 90 }]} />
    <View style={[styles.blob, { top: -18, right: -22, backgroundColor: YELLOW, width: 110, height: 110 }]} />
    <View style={[styles.blob, { bottom: -40, left: -36, backgroundColor: YELLOW, width: 140, height: 140 }]} />
    <View style={[styles.blob, { bottom: -32, right: -28, backgroundColor: ORANGE, width: 120, height: 120 }]} />
  </View>
);

// --- Animated Button component ---
const AnimatedButton: React.FC<{ label: string; variant?: 'primary' | 'outline'; onPress?: () => void }> = ({ label, variant = 'primary', onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const onIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 28, bounciness: 0 }).start();
  const onOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 7 }).start();
  return (
    <Pressable onPress={onPress} onPressIn={onIn} onPressOut={onOut}>
      <Animated.View style={[variant === 'primary' ? styles.primaryBtn : styles.outlineBtn, { transform: [{ scale }] }]}>
        <Text style={variant === 'primary' ? styles.primaryTxt : styles.outlineTxt}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flexGrow: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },

  // blobs
  blob: { position: 'absolute', borderRadius: 9999, opacity: 1 },

  // avatar
  avatarWrap: { width: 180, height: 180, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  pulseRing: { position: 'absolute', width: 160, height: 160, borderRadius: 999, backgroundColor: ORANGE_LIGHT },
  avatarBorder: { borderWidth: 6, borderColor: ORANGE, borderRadius: 999, padding: 4, backgroundColor: '#fff' },
  avatar: { width: 140, height: 140, borderRadius: 999 },

  // text
  title: { fontSize: 26, fontWeight: '800', color: '#111827', marginTop: 4 },
  subtitle: { fontSize: 13, textAlign: 'center', color: ORANGE_DARK, lineHeight: 18, marginTop: 10, marginBottom: 24 },

  // buttons
  actions: { width: '100%', gap: 16 },
  primaryBtn: { backgroundColor: ORANGE, paddingVertical: 16, borderRadius: 14, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  primaryTxt: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  outlineBtn: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: ORANGE, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  outlineTxt: { color: ORANGE, fontWeight: '800', fontSize: 16 },

  // gif abajo
  bottomGifArea: { marginTop: 24, marginBottom: 6 },
  enaWrap: { overflow: 'hidden', borderWidth: 6, borderColor: ORANGE, backgroundColor: '#fff' },
});

// -----------------------------------------------------------------------------
// FILE: app/(tabs)/index.tsx  (Expo Router example)
/*
import WalletScreen from '@/components/WalletScreen';

export default function HomeScreen() {
  return (
    <WalletScreen
      onCreateAccount={() => console.log('Crear Cuenta')}
      onLogin={() => console.log('Iniciar Sesion')}
    />
  );
}
*/

// Si no usas alias '@/components':
// import WalletScreen from '../../components/WalletScreen';
