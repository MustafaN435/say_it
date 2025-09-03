import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { saveSosDoc } from '../firebase';

export default function SosScreen() {
  const [emergencyType, setEmergencyType] = useState('select');
  const [shareLocation, setShareLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSOS = async () => {
    if (emergencyType === 'select') {
      Alert.alert('Please select an emergency type first.');
      return;
    }

    setSubmitting(true);

    let coords = null;
    try {
      if (shareLocation) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission needed',
            'Location permission is required to share your position.'
          );
        } else {
          const pos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            maximumAge: 15000,
          });
          coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy ?? null,
          };
        }
      }

      await saveSosDoc({
        emergencyType,
        shareLocation,
        location: coords,      // null if not sharing / denied
        status: 'active',
      });

      let msg = `🚨 Emergency: ${emergencyType}`;
      msg += shareLocation && coords
        ? `\n📍 Location captured`
        : `\n📍 Location not shared`;
      Alert.alert('SOS sent!', msg);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not send SOS. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const callEmergencyContact = () => {
    Alert.alert('Calling...', 'Emergency contact has been notified!');
    // (Future) Integrate Twilio or sms
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report an Emergency</Text>

      <Text style={styles.label}>Select Emergency Type:</Text>
      <Picker
        selectedValue={emergencyType}
        onValueChange={(itemValue) => setEmergencyType(itemValue)}
        style={styles.picker}
        testID="emergencyTypePicker"
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
          testID="shareLocationSwitch"
        />
      </View>

      <TouchableOpacity style={styles.contactBtn} onPress={callEmergencyContact}>
        <Text style={styles.contactBtnText}>📞 Call Emergency Contact</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 8 }}>
        <Button
          title={submitting ? 'Sending...' : '🚨 Send SOS Alert'}
          onPress={handleSOS}
          color="#D32F2F"
          disabled={submitting}
          testID="sendSosBtn"
        />
      </View>

      {submitting && (
        <View style={{ marginTop: 12 }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  label: { fontSize: 16, marginVertical: 10 },
  picker: { borderColor: '#ccc', borderWidth: 1, backgroundColor: '#f5f5f5' },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20,
  },
  contactBtn: { backgroundColor: '#1976D2', padding: 12, borderRadius: 8, marginBottom: 20 },
  contactBtnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});
