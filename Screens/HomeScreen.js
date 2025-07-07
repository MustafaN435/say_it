import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Legal Chatbot" onPress={() => navigation.navigate('Chat')} />
      <Button title="Send SOS Alert" onPress={() => navigation.navigate('SOS')} />
      <Button title="Report a Crime" onPress={() => navigation.navigate('Report')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 20, padding: 30 }
});
// This is the HomeScreen component for the Say It app, providing navigation to different functionalities.
// It includes buttons for accessing the legal chatbot, sending an SOS alert, and reporting a crime