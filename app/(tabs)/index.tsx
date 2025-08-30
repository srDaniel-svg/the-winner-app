// FILE: components/WalletScreen.tsx
import React from 'react';
import { SafeAreaView, View, Text, Image, Pressable, StyleSheet, StatusBar, ScrollView } from 'react-native';

type Props = {
  onCreateAccount?: () => void;
  onLogin?: () => void;
  avatarUri?: string;
};

const WalletScreen: React.FC<Props> = ({ onCreateAccount, onLogin, avatarUri }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Avatar */}
        <Image
          source={{ uri: avatarUri || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=240&fit=crop' }}
          style={styles.avatar}
        />

        {/* Title & subtitle */}
        <Text style={styles.title}>TransBolivia</Text>
        <Text style={styles.subtitle}>
          paga tu paputransporte en tu papubilletera móvil para paputransportes :V
        </Text>

        {/* Buttons */}
        <View style={styles.actions}>
          <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]} onPress={onCreateAccount}>
            <Text style={styles.primaryTxt}>Crear Cuenta</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.ghostBtn, pressed && styles.pressed]} onPress={onLogin}>
            <Text style={styles.ghostTxt}>Iniciar Sesión</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

const BLUE = '#2563EB'; // tailwind blue-600
const BLUE_LIGHT = '#E0EAFF';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 999,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: BLUE,
    lineHeight: 18,
    marginBottom: 28,
  },
  actions: {
    width: '100%',
    gap: 14,
  },
  primaryBtn: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryTxt: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  ghostBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: BLUE,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  ghostTxt: {
    color: BLUE,
    fontWeight: '800',
    fontSize: 16,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});

// -----------------------------------------------------------------------------
// FILE: app/(tabs)/index.tsx  (uso dentro de Expo Router)
// Reemplaza el contenido de tu HomeScreen con esto si quieres que muestre el diseño:

/*
import WalletScreen from '@/components/WalletScreen';

export default function HomeScreen() {

  const [open, setOpen] = useState(false);

  return (
    <WalletScreen
      onCreateAccount={() => console.log('Crear Cuenta')}
      onLogin={() => console.log('Iniciar Sesión')}
    />
  );
}
*/

// -----------------------------------------------------------------------------
// Sugerencia opcional: si no usas alias '@/components', importa relativo:
// import WalletScreen from '../../components/WalletScreen';
