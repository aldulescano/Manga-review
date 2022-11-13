import React, { Component } from 'react';
import {Text, View, StyleSheet, Image } from 'react-native'


class Busqueda extends Component {
    constructor(){
        super();
        this.state = {    

        }
    }

    render(){
        return(

            <View style={styles.container}>
                <Text style = {styles.titulo}> Busca un usuario</Text>
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
    }
})

export default Busqueda;
