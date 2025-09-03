import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { ensureAuthReady } from './firebase';

import HomeScreen from './Screens/HomeScreen';
import ChatScreen from './Screens/ChatScreen';
import SosScreen from './Screens/SosScreen';
import ReportScreen from './Screens/ReportScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    ensureAuthReady().catch(console.error);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="SOS" component={SosScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// This is the main App component for the Say It app, which sets up the navigation structure.
// It uses React Navigation to create a stack navigator with four screens: Home, Chat, SOS, and Report.
// Each screen is linked to its respective component, allowing users to navigate between different functionalities of the app.
// The initial route is set to the Home screen, which provides access to the legal chatbot, SOS alert, and crime reporting features.
// The app is structured to eventually include more complex functionalities, such as a legal chatbot and SOS alerts, while currently displaying simple text in each screen component.
