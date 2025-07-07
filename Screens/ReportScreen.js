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

export default function ReportScreen() {
  const [crimeType, setCrimeType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmit = () => {
    // For now, we just show an alert #TODO
    Alert.alert("Report Submitted", "Thank you. Your report has been recorded");

    // Reset fields
    setCrimeType('');
    setLocation('');
    setDescription('');
    setIsAnonymous(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report a Crime</Text>

      <Text style={styles.label}>Type of Crime</Text>
      <Picker
        selectedValue={crimeType}
        onValueChange={(itemValue) => setCrimeType(itemValue)}
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
        style={styles.input}
        placeholder="Enter location or area"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Additional Details (optional)</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Describe what happened..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>
        {isAnonymous ? "Reporting Anonymously" : "Not Anonymous"}
      </Text>
      <Button
        title={isAnonymous ? "Switch to Name-based Report" : "Switch to Anonymous"}
        onPress={() => setIsAnonymous(!isAnonymous)}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Submit Report" onPress={handleSubmit} />
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
