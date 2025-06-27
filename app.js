import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

import FormularioScreen from './screens/FormularioScreen';
import AvisosScreen from './screens/AvisosScreen';
import EventosScreen from './screens/EventosScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      const { data: token } = await Notifications.getExpoPushTokenAsync();
      console.log('Push token:', token);

      Notifications.addNotificationReceivedListener(notification => {
        console.log('Notificação recebida:', notification);
      });
    };
    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Avisos" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Avisos" component={AvisosScreen} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
        <Stack.Screen name="Eventos" component={EventosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
