import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Portada from './src/screens/Portada';
import Registro from './src/screens/Registro';
import Inicio from './src/screens/Inicio';
import Comments from "./src/screens/Comments";
import Menu from './src/components/Menu';
import EdicionPerfil from './src/screens/EdicionPerfil';
import Perfil from './src/screens/Perfil';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Portada' component={Portada} options= {{ headerShown : false}}/> 
        <Stack.Screen name='Menu' component={Menu} options= {{ headerShown : false}}/>
        <Stack.Screen name='Registro' component={Registro} options= {{ headerShown : false}}/>
        <Stack.Screen name='Inicio' component={Inicio} options= {{ headerShown : false}}/>
        <Stack.Screen name='Comments' component={Comments}/>
        <Stack.Screen name='EdicionPerfil' component={EdicionPerfil} options= {{ headerShown : false}}/>
        <Stack.Screen name='Perfil' component={Perfil} options= {{ headerShown : false}}/>
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