import React, { Component } from 'react';
import {Text, View, StyleSheet, Image } from 'react-native'


class Principal extends Component {
    constructor(){
        super();
        this.state = {      posteos: [],
        }
    }

    

    render(){
        console.log(this.state.users);
        return(

            <View style={styles.container}>
                
            <Image
                style = {styles.icono}
                source = {require('../../assets/iconoDefault.png')}
                resizeMode = 'contain'
            />
                <Text style = {styles.titulo}> Principal</Text>
                <Text style ={styles.titulo}> Posteos </Text>     
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
    titulo: {
        fontFamily: 'Courier',
        fontSize: 22,
        margin: 20
    },
    form:{
        backgroundColor: 'rgb(94, 171, 194)',
        borderRadius: 10,
        padding: 15
    },
    campo: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'center',
        color: 'rgb(115, 115, 115)',
        padding: 5
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