import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WalletScreen() {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const balance = 45.50;
  const tripCost = 2.50;

  const calculateTotal = () => {
    return (adultCount * 2.50 + childCount * 1.25).toFixed(2);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Saldo Card */}
      <LinearGradient
        colors={['#2FE49A', '#00C9FF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.balanceCard}
      >
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Saldo</Text>
          <TouchableOpacity style={styles.rechargeButtonSmall}>
            <Text style={styles.rechargeButtonSmallText}>Recargar</Text>
            <MaterialIcons name="sentiment-satisfied-alt" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </LinearGradient>

      {/* Último viaje Card */}
      <View style={styles.lastTripCard}>
        <Text style={styles.lastTripLabel}>Último viaje</Text>
        <View style={styles.tripDetails}>
          <View>
            <Text style={styles.tripRoute}>Línea 3 - Metro</Text>
            <Text style={styles.tripTime}>Hace 2 horas</Text>
          </View>
          <View style={styles.tripAmountContainer}>
            <Text style={styles.tripAmount}>-${tripCost.toFixed(2)}</Text>
            <View style={styles.completedTag}>
              <Text style={styles.completedText}>Completado</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ¿Para quién pagas? Section */}
      <View style={styles.paymentSelectionCard}>
        <View style={styles.paymentSelectionHeader}>
          <Text style={styles.paymentSelectionTitle}>¿Para quién pagas?</Text>
          <View style={styles.newTag}>
            <Text style={styles.newText}>Nuevo</Text>
          </View>
        </View>

        <View style={styles.countersContainer}>
          {/* Adult Counter */}
          <View style={styles.counterItem}>
            <MaterialIcons name="person-outline" size={24} color="#4CAF50" />
            <View>
              <Text style={styles.counterLabel}>Adulto</Text>
              <Text style={styles.counterPrice}>$2.50</Text>
            </View>
            <View style={styles.counterControls}>
              <TouchableOpacity onPress={() => setAdultCount(Math.max(0, adultCount - 1))}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.countText}>{adultCount}</Text>
              <TouchableOpacity onPress={() => setAdultCount(adultCount + 1)}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Niño Counter */}
          <View style={styles.counterItem}>
            <MaterialIcons name="child-care" size={24} color="#FFC107" />
            <View>
              <Text style={styles.counterLabel}>Niño</Text>
              <Text style={styles.counterPrice}>$1.25</Text>
            </View>
            <View style={styles.counterControls}>
              <TouchableOpacity onPress={() => setChildCount(Math.max(0, childCount - 1))}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.countText}>{childCount}</Text>
              <TouchableOpacity onPress={() => setChildCount(childCount + 1)}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
      </View>

      {/* Tap NFC Button */}
      <TouchableOpacity style={styles.tapNFCButton}>
        <LinearGradient
          colors={['#2FE49A', '#00C9FF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        >
          <Text style={styles.tapNFCButtonText}>Tap NFC para pagar — ${calculateTotal()}</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Mostrar código corto Button */}
      <TouchableOpacity style={styles.shortCodeButton}>
        <Text style={styles.shortCodeButtonText}># Mostrar código corto (20s)</Text>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <MaterialIcons name="attach-money" size={28} color="#2FE49A" />
          <Text style={styles.bottomButtonText}>Recargar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <MaterialIcons name="history" size={28} color="#00C9FF" />
          <Text style={styles.bottomButtonText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Light grey background
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  // Balance Card
  balanceCard: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  rechargeButtonSmall: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  rechargeButtonSmallText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 5,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  // Last Trip Card
  lastTripCard: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  lastTripLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripRoute: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tripTime: {
    fontSize: 14,
    color: '#888',
  },
  tripAmountContainer: {
    alignItems: 'flex-end',
  },
  tripAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completedTag: {
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  completedText: {
    color: '#00BCD4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Payment Selection Card
  paymentSelectionCard: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  paymentSelectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  paymentSelectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  newTag: {
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  newText: {
    color: '#00BCD4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  countersContainer: {
    marginBottom: 15,
  },
  counterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  counterLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  counterPrice: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#666',
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginTop: 10,
  },
  // Tap NFC Button
  tapNFCButton: {
    width: '90%',
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tapNFCButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 60,
  },
  // Short Code Button
  shortCodeButton: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  shortCodeButtonText: {
    color: '#00C9FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Bottom Buttons
  bottomButtonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
  },
  bottomButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  bottomButtonText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

