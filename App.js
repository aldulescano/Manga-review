import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Postear from './src/screens/Postear';
import Registro from './src/screens/Registro';
import Inicio from './src/screens/Inicio';
import Portada from './src/screens/Portada';
import Principal from './src/screens/Principal';
import Perfil from './src/screens/Principal';
import Comments from "./src/screens/Comments"

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Portada' component={Portada} options= {{ headerShown : false}}/> 
        <Stack.Screen name='Principal' component={Principal} options= {{ headerShown : false}}/>
        <Stack.Screen name='Postear' component={Postear} options= {{ headerShown : false}}/>
        <Stack.Screen name='Registro' component={Registro} options= {{ headerShown : false}}/>
        <Stack.Screen name='Inicio' component={Inicio} options= {{ headerShown : false}}/>
        <Stack.Screen name='Perfil' component={Perfil} options= {{ headerShown : false}}/>
        <Stack.Screen name='Comments' component={Comentario} options= {{ headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;