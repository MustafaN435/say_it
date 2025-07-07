import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SosScreen() {
  const [emergencyType, setEmergencyType] = useState('select');
  const [shareLocation, setShareLocation] = useState(false);

  const handleSOS = () => {
    if (emergencyType === 'select') {
      Alert.alert('Please select an emergency type first.');
      return;
    }

    let message = `🚨 Emergency Type: ${emergencyType}`;
    message += shareLocation
      ? '\n📍 Location sharing is ON.'
      : '\n📍 Location sharing is OFF.';

    Alert.alert('SOS Sent!', message);
  };

  const callEmergencyContact = () => {
    Alert.alert('Calling...', 'Emergency contact has been notified!');
    // Later: integrate with linking or Twilio API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report an Emergency</Text>

      <Text style={styles.label}>Select Emergency Type:</Text>
      <Picker
        selectedValue={emergencyType}
        onValueChange={(itemValue) => setEmergencyType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="-- Select --" value="select" />
        <Picker.Item label="Robbery" value="Robbery" />
        <Picker.Item label="Harassment" value="Harassment" />
        <Picker.Item label="Assault" value="Assault" />
        <Picker.Item label="Domestic Violence" value="Domestic Violence" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <View style={styles.row}>
        <Text style={styles.label}>Share Location:</Text>
        <Switch
          value={shareLocation}
          onValueChange={() => setShareLocation(!shareLocation)}
        />
      </View>

      <TouchableOpacity style={styles.contactBtn} onPress={callEmergencyContact}>
        <Text style={styles.contactBtnText}>📞 Call Emergency Contact</Text>
      </TouchableOpacity>

      <Button title="🚨 Send SOS Alert" onPress={handleSOS} color="#D32F2F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  contactBtn: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  contactBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
