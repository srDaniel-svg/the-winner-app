import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
  return (
    <View>
      <Text>Historial</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});
