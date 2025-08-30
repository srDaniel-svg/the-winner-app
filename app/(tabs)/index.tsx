// FILE: components/WalletScreen.tsx (focus: circulitos tipo DVD muy lentos)
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
  Dimensions,
} from 'react-native';

// --- Colores ---
const ORANGE = '#F97316';
const ORANGE_DARK = '#EA580C';
const ORANGE_LIGHT = '#FFE8D9';
const YELLOW = '#FACC15';
const SALMON = '#FDBA74';

// (Mantengo la UI de antes, pero nos enfocamos en los circulitos animados)

const WalletScreen: React.FC<{ onCreateAccount?: () => void; onLogin?: () => void; avatarUri?: string; }> = ({ onCreateAccount, onLogin, avatarUri }) => {
  // --- Animación de entrada UI (igual que antes) ---
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(20)).current;
  const avatarScale = useRef(new Animated.Value(0.9)).current;
  const pulse = useRef(new Animated.Value(0)).current;

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

      {/* Fondo: blobs grandes fijos + minis rebotando lento */}
      <BackgroundBlobs />
      <DVDWallpaper />

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

          <Animated.Text style={[styles.title, { opacity: fadeIn }]}>TransBolivia</Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: fadeIn }]}>
            paga tu paputransporte en tu papubilletera mobil para paputransportes :V
          </Animated.Text>

          <View style={styles.actions}>
            <AnimatedButton label="Crear Cuenta" variant="primary" onPress={onCreateAccount} />
            <AnimatedButton label="Iniciar Sesion" variant="outline" onPress={onLogin} />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

// --- Blobs grandes fijos (decoración esquinas) ---
const BackgroundBlobs = () => (
  <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <View style={[styles.blob, { top: -28, left: -28, backgroundColor: ORANGE, width: 90, height: 90 }]} />
    <View style={[styles.blob, { top: -18, right: -22, backgroundColor: YELLOW, width: 110, height: 110 }]} />
    <View style={[styles.blob, { bottom: -40, left: -36, backgroundColor: YELLOW, width: 140, height: 140 }]} />
    <View style={[styles.blob, { bottom: -32, right: -28, backgroundColor: ORANGE, width: 120, height: 120 }]} />
  </View>
);

// --- Minis en movimiento tipo DVD (muy lentos, con "choque" en esquinas) ---
const DVDWallpaper: React.FC = () => {
  const { width, height } = Dimensions.get('window');
  const margin = 8; // distancia al borde

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { zIndex: -1 }]}> {/* detrás de todo */}
      {/* Puedes añadir/quitar blobs duplicando la línea */}
      <FloatingBlob size={26} color={ORANGE} start={{ x: 60, y: 120 }} velocity={{ vx: 0.20, vy: 0.18 }} bounds={{ width, height, margin }} />
      <FloatingBlob size={22} color={YELLOW} start={{ x: width - 120, y: 220 }} velocity={{ vx: -0.22, vy: 0.17 }} bounds={{ width, height, margin }} />
      <FloatingBlob size={20} color={SALMON} start={{ x: width / 2, y: height / 2 }} velocity={{ vx: 0.19, vy: -0.21 }} bounds={{ width, height, margin }} />
      <FloatingBlob size={24} color={ORANGE} start={{ x: width / 3, y: height / 3 }} velocity={{ vx: 0.16, vy: 0.23 }} bounds={{ width, height, margin }} />
    </View>
  );
};

const FloatingBlob: React.FC<{
  size: number;
  color: string;
  start: { x: number; y: number };
  velocity: { vx: number; vy: number }; // px/frames (60fps aprox.)
  bounds: { width: number; height: number; margin: number };
}> = ({ size, color, start, velocity, bounds }) => {
  const pos = useRef(new Animated.ValueXY({ x: start.x, y: start.y })).current;
  const hitScale = useRef(new Animated.Value(1)).current; // pequeño "pop" al tocar esquina
  const v = useRef({ ...velocity }).current;
  const px = useRef(start.x);
  const py = useRef(start.y);

  useEffect(() => {
    let raf: number;
    const minX = bounds.margin;
    const minY = bounds.margin;
    const maxX = bounds.width - size - bounds.margin;
    const maxY = bounds.height - size - bounds.margin;
    const snap = 6; // px para "encajar" en esquinas

    const step = () => {
      // avanzar
      px.current += v.vx;
      py.current += v.vy;

      // rebote bordes
      let bounced = false;
      if (px.current <= minX || px.current >= maxX) {
        v.vx *= -1; bounced = true;
        px.current = Math.max(minX, Math.min(px.current, maxX));
      }
      if (py.current <= minY || py.current >= maxY) {
        v.vy *= -1; bounced = true;
        py.current = Math.max(minY, Math.min(py.current, maxY));
      }

      // detectar esquina cercana y "encajar"
      const nearLeft = Math.abs(px.current - minX) < snap;
      const nearRight = Math.abs(px.current - maxX) < snap;
      const nearTop = Math.abs(py.current - minY) < snap;
      const nearBottom = Math.abs(py.current - maxY) < snap;
      if ((nearLeft || nearRight) && (nearTop || nearBottom)) {
        px.current = nearLeft ? minX : maxX;
        py.current = nearTop ? minY : maxY;
        // animación pop al tocar esquina
        Animated.sequence([
          Animated.timing(hitScale, { toValue: 1.15, duration: 120, useNativeDriver: true }),
          Animated.spring(hitScale, { toValue: 1, useNativeDriver: true, speed: 16, bounciness: 6 }),
        ]).start();
      } else if (bounced) {
        // rebote normal (sin pop)
      }

      pos.setValue({ x: px.current, y: py.current });
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [pos, v, size, bounds, hitScale]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        transform: [...pos.getTranslateTransform(), { scale: hitScale }],
        opacity: 0.95,
      }}
    />
  );
};

// --- Botón animado (igual) ---
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

// --- Estilos ---
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flexGrow: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  blob: { position: 'absolute', borderRadius: 9999, opacity: 1 },
  avatarWrap: { width: 180, height: 180, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  pulseRing: { position: 'absolute', width: 160, height: 160, borderRadius: 999, backgroundColor: ORANGE_LIGHT },
  avatarBorder: { borderWidth: 6, borderColor: ORANGE, borderRadius: 999, padding: 4, backgroundColor: '#fff' },
  avatar: { width: 140, height: 140, borderRadius: 999 },
  title: { fontSize: 26, fontWeight: '800', color: '#111827', marginTop: 4 },
  subtitle: { fontSize: 13, textAlign: 'center', color: ORANGE_DARK, lineHeight: 18, marginTop: 10, marginBottom: 24 },
  actions: { width: '100%', gap: 16 },
  primaryBtn: { backgroundColor: ORANGE, paddingVertical: 16, borderRadius: 14, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  primaryTxt: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  outlineBtn: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: ORANGE, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  outlineTxt: { color: ORANGE, fontWeight: '800', fontSize: 16 },
});

// -----------------------------------------------------------------------------
// FILE: app/(tabs)/index.tsx (ejemplo Expo Router)
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
