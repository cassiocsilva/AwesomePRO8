import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Registrar from '../screens/Registrar';
import Home from '../screens/Home';
import HabilitarRastreador from '../screens/HabilitarRastreador';
import RastreadorHabilitado from '../screens/RastreadorHabilitado';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HabilitarRastreador" component={HabilitarRastreador} />
        <Stack.Screen name="RastreadorHabilitado" component={RastreadorHabilitado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;