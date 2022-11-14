import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { AntDesign, Ionicons } from '@expo/vector-icons'; 

import Principal from '../screens/Principal';
import MiPerfil from '../screens/MiPerfil';
import Busqueda from '../screens/Busqueda';
import Postear from '../screens/Postear';

const Tab = createBottomTabNavigator();

function Menu(){

    return (
        <Tab.Navigator screenOptions = {{ tabBarShowLabel: false}}>
            <Tab.Screen 
                name="Principal" 
                component={ Principal }  
                options={ {tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }}/>
            <Tab.Screen 
                name="MiPerfil" 
                component={ MiPerfil } 
                options={ {tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }}/>
            <Tab.Screen 
                name="Busqueda" 
                component={ Busqueda } 
                options={ {tabBarIcon: () => <AntDesign name="search1" size={24} color="black" /> }}/>
            <Tab.Screen 
                name="Postear" 
                component={ Postear }
                options={ {tabBarIcon: () => <Ionicons name="add-circle-outline" size={24} color="black" /> }}/>
        </Tab.Navigator>
    )

}

export default Menu;