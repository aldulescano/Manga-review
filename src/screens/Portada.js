import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Portada extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            contraseña: "",
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
                <Text onPress={ () => this.props.navigation.navigate ('Registro')} style={styles.link}>Registrate</Text>
                <Text onPress={ () => this.props.navigation.navigate ('Inicio')} style={styles.link}>Inicia Sesión</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgb(234,252,255)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        fontFamily: 'Courier',
        fontSize: 18,
        margin: 10
    },
    icono:{
        height: 180,
        width: 180,
        margin: 20
    }
})


export default Portada;