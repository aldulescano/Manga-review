import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Comments from '../screens/Comments';
import Perfil from '../screens/Perfil';
import Principal from '../screens/Principal';
import Busqueda from '../screens/Busqueda';
import EdicionPerfil from '../screens/EdicionPerfil';

const Stack = createNativeStackNavigator();

function Navegacion() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='Principal' component={Principal} options= {{ headerShown : false}}/> 
        <Stack.Screen name='Comments' component={Comments} />
        <Stack.Screen name='Perfil' component={Perfil} options= {{ headerShown : false}}/>
        <Stack.Screen name='EdicionPerfil' component={EdicionPerfil} options= {{ headerShown : false}}/>
      </Stack.Navigator>
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

export default Navegacion;