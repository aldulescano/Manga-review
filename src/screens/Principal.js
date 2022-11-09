import React, { Component } from 'react';
import {Text, View, StyleSheet, Image } from 'react-native'

import Perfil from './Perfil';
import Menu from '../components/Menu';

class Principal extends Component {
    constructor(){
        super();
        this.state = {      posteos: [],
        }
    }

    

    render(){
        return(

            <View style={styles.container}>
                
            <Image
                style = {styles.icono}
                source = {require('../../assets/iconoDefault.png')}
                resizeMode = 'contain'
            />
                <Text style = {styles.titulo}> Principal</Text>
                {/* <Text onPress={ () => this.props.navigation.navigate ('Perfil')} style={styles.link}>Perfil</Text>
                <Text onPress={ () => this.props.navigation.navigate ('Postear')} style={styles.link}>Postear</Text> */}
  
            <Menu/>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgb(234,252,255)',

    },
    titulo: {
        fontFamily: 'Courier',
        fontSize: 22,
        margin: 20
    },
    boton: {
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(234,252,255)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    },
    link: {
        fontFamily: 'Courier',
        fontSize: 10,
        margin: 4,
        textAlign: 'right'
    },
    icono:{
        height: 120,
        width: 120
    }
})

export default Principal