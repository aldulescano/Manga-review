import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Perfil from '../screens/Perfil';
import Postear from '../screens/Postear';
import Busqueda from '../screens/Busqueda';

import { AntDesign, Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

function Menu() {
    return(
        <Tab.Navigator screenOptions = {{ tabBarShowLabel: false}}>
            <Tab.Screen name= "Perfil" component = { Perfil } options = { {tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }}/>
            <Tab.Screen name = "Busqueda" component={ Busqueda } options = { {tabBarIcon:() => <AntDesign name="search1" size={24} color="black" />}} />
            <Tab.Screen name = "Postear" component={ Postear } options = { {tabBarIcon:() => <Ionicons name="add-circle-outline" size={24} color="black" />}} />
        </Tab.Navigator>
    );
};

export default Menu;