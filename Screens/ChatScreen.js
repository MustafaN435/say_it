import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a legal assistant in Pakistan. Provide general legal guidance in plain language. Do not offer legal advice.',
            },
            ...updatedMessages,
          ],
        },
        {
          headers: {
            Authorization: 'Bearer OPENAI_API_KEY',
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = response.data.choices[0].message;
      setMessages(prev => [...prev, reply]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      }]);
      console.error('ChatGPT Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={msg.role === 'user' ? styles.user : styles.bot}
          >
            {msg.content}
          </Text>
        ))}
        {loading && <ActivityIndicator size="small" color="#555" />}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Ask a legal question..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  chatBox: { flex: 1, marginBottom: 10 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
  },
});
