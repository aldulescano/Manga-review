import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import Encabezado from '../components/Encabezado';
import { AntDesign } from '@expo/vector-icons'; 

import { db } from '../firebase/config';


class Busqueda extends Component {
    constructor(){
        super();
        this.state = {    
            input: '',
            usuarios: [],
            resultados: [],
            cargando: true
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let info = [];
                docs.forEach ( doc => {
                    info.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        usuarios: info[0].data
                    })
                })
            }
        )
    }

    buscar(){

    }

    irAPerfil(){
        if (this.props.posteoData.data.creador === auth.currentUser.email) {
            this.props.navigation.navigate('MiPerfil')
        } else {
            this.props.navigation.navigate('Perfil', { email: this.props.posteoData.data.creador })
        }
    }

    render(){
        return(

            <View style={styles.container}>
                <Encabezado/>
                <View style={styles.form}>
                    <TextInput 
                            placeholder= 'Email'
                            keyboardType= 'default'
                            onChangeText={ texto => this.setState({input : texto})}
                            value = {this.state.input}
                            style={styles.campo}
                    />
                    <AntDesign name="search1" size={24} color="black" />
                </View>

                {
                    this.state.resultado != '' ?
                    <Text style={styles.aviso}> No hay un usuario que coincida con tu búsqueda</Text>
                    :
                    <FlatList
                            data={this.state.resultados}
                            keyExtractor={Unusuario => Unusuario.id.toString()}
                            renderItem={({ item }) => 
                                <TouchableOpacity onPress={() => this.irAPerfil()}>
                                    <Text>{this.state.resultados[item].userName}</Text>
                                </TouchableOpacity>
                            }
                    />
                }
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
    form:{
        backgroundColor: 'rgb(94, 171, 194)',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
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
    aviso: {
        fontFamily: 'Courier',
        fontSize: 13,
        marginTop: 10,
    }
})

export default Busqueda;
