import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SosScreen() {
  const [sent, setSent] = useState(false);

  const handleSOS = () => {
    setSent(true);
    Alert.alert("SOS Alert Sent", "Your emergency location has been shared.");
    // In future: Get location and send to backend or emergency contacts
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
      {sent && <Text style={styles.confirmation}>Alert sent successfully</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
  sosText: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  confirmation: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
});
// This is the SosScreen component for the Say It app, which allows users to send an SOS alert.
// It includes a large red button that, when pressed, simulates sending an emergency alert and displays a confirmation message.
// The SOS button is styled to be prominent and visually distinct, ensuring it is easily accessible in emergencies.
// In the future, this component can be expanded to include location tracking and integration with emergency services or contacts.  