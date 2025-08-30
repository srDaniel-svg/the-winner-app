import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import {
  Bell,
  CircleQuestionMark,
  CreditCard,
  Earth,
  Eye,
  Lock,
  LockKeyhole,
  Mail,
  Phone,
  Pin,
  Smartphone,
  User,
  ChevronRight,
} from 'lucide-react-native';

/* ---------- Subcomponentes ---------- */

function ProfileHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitials}>JD</Text>
        </View>
      </View>
      <Text style={styles.userName}>Juan Doe</Text>
      <Text style={styles.userEmail}>juan.doe@email.com</Text>
    </View>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  testID?: string;
};

function MenuItem({ icon, label, onPress, testID }: MenuItemProps) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && Platform.OS === 'ios' ? { opacity: 0.9 } : null,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>{icon}</View>
        <Text style={styles.menuText}>{label}</Text>
      </View>
      <ChevronRight size={18} color={Colors.light.icon} />
    </Pressable>
  );
}

/* ---------- Pantalla ---------- */

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileHeader />

      <View style={styles.sectionsContainer}>
        {/* Información Personal */}
        <Section title="Información Personal">
          <MenuItem
            icon={<User size={20} color={Colors.light.text} />}
            label="Editar Perfil"
            onPress={() => { }}
          />
          <MenuItem
            icon={<Smartphone size={20} color={Colors.light.text} />}
            label="Número de Teléfono"
            onPress={() => { }}
          />
          <MenuItem
            icon={<Pin size={20} color={Colors.light.text} />}
            label="Dirección"
            onPress={() => { }}
          />
        </Section>

        {/* Pagos y Seguridad */}
        <Section title="Pagos y Seguridad">
          <MenuItem
            icon={<CreditCard size={20} color={Colors.light.text} />}
            label="Métodos de Pago"
            onPress={() => { }}
          />
          <MenuItem
            icon={<Lock size={20} color={Colors.light.text} />}
            label="Cambiar Contraseña"
            onPress={() => { }}
          />
          <MenuItem
            icon={<LockKeyhole size={20} color={Colors.light.text} />}
            label="Autenticación de Dos Factores"
            onPress={() => { }}
          />
        </Section>

        {/* Soporte y Ayuda */}
        <Section title="Soporte y Ayuda">
          <MenuItem
            icon={<CircleQuestionMark size={20} color={Colors.light.text} />}
            label="Preguntas Frecuentes"
            onPress={() => { }}
          />
          <MenuItem
            icon={<Phone size={20} color={Colors.light.text} />}
            label="Contactar Soporte"
            onPress={() => { }}
          />
          <MenuItem
            icon={<Mail size={20} color={Colors.light.text} />}
            label="Enviar Feedback"
            onPress={() => { }}
          />
        </Section>

        {/* Configuración y Privacidad */}
        <Section title="Configuración y Privacidad">
          <MenuItem
            icon={<Bell size={20} color={Colors.light.text} />}
            label="Notificaciones"
            onPress={() => { }}
          />
          <MenuItem
            icon={<Earth size={20} color={Colors.light.text} />}
            label="Idioma"
            onPress={() => { }}
          />
          <MenuItem
            icon={<Eye size={20} color={Colors.light.text} />}
            label="Privacidad"
            onPress={() => { }}
          />
        </Section>

        {/* Cerrar Sesión */}
        <View style={styles.section}>
          <Pressable
            style={styles.logoutButton}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            onPress={() => { }}
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
          >
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

/* ---------- Estilos ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 24,
    backgroundColor: '#fff',
  },

  /* Header */
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.light.icon,
  },

  /* Secciones */
  sectionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 15,
    paddingLeft: 5,
  },

  /* Items */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    // sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: Colors.light.text,
  },

  /* Cerrar sesión */
  logoutButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
