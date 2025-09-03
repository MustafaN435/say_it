import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { saveReportDoc } from '../firebase'; 

export default function ReportScreen() {
  const [crimeType, setCrimeType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!crimeType) {
      Alert.alert('Missing information', 'Please select a crime type.');
      return;
    }

    setSubmitting(true);
    try {
      await saveReportDoc({
        crimeType,
        locationText: location || null,
        description: description || null,
        isAnonymous,
        status: 'submitted',
      });

      Alert.alert('Report Submitted', 'Thank you. Your report has been recorded.');
      // Reset fields
      setCrimeType('');
      setLocation('');
      setDescription('');
      setIsAnonymous(true);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not submit your report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report a Crime</Text>

      <Text style={styles.label}>Type of Crime</Text>
      <Picker
        testID="crimeTypePicker"
        selectedValue={crimeType}
        onValueChange={(v) => setCrimeType(v)}
        style={styles.picker}
      >
        <Picker.Item label="Select..." value="" />
        <Picker.Item label="Domestic Violence" value="domestic" />
        <Picker.Item label="Harassment" value="harassment" />
        <Picker.Item label="Theft" value="theft" />
        <Picker.Item label="Assault" value="assault" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <Text style={styles.label}>Where did it happen?</Text>
      <TextInput
        testID="locationInput"
        style={styles.input}
        placeholder="Enter location or area"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Additional Details (optional)</Text>
      <TextInput
        testID="descriptionInput"
        style={[styles.input, { height: 100 }]}
        placeholder="Describe what happened..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>
        {isAnonymous ? 'Reporting Anonymously' : 'Not Anonymous'}
      </Text>
      <Button
        title={isAnonymous ? 'Switch to Name-based Report' : 'Switch to Anonymous'}
        onPress={() => setIsAnonymous(!isAnonymous)}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          testID="submitBtn"
          title={submitting ? 'Submitting...' : 'Submit Report'}
          onPress={handleSubmit}
          disabled={submitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 10, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  picker: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
