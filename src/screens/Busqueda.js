import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { db, auth } from '../firebase/config';

import Encabezado from '../components/Encabezado';

class Busqueda extends Component {
    constructor(){
        super();
        this.state = {    
            input: '',
            usuarios: [],
            resultados: [],
            buscando: false
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
                        usuarios: info
                    })
                })
            }
        )
    }

    filtrar(texto){
        if( texto === '') {
            this.setState({
                resultados: [],
                input: '',
                buscando: false
            })
        }else{
            let filtrado = this.state.usuarios.filter((usuario) => usuario.data.owner.toLowerCase().includes(texto.toLowerCase()))
            this.setState({
                resultados: filtrado,
                input: texto,
                buscando: true
            })
        } 

    }


    irAPerfil(item){
        if (item.data.owner === auth.currentUser.email) {
            this.props.navigation.navigate('MiPerfil')
        } else {
            this.props.navigation.navigate('Perfil', { email: item.data.owner })
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
                            onChangeText= {texto => this.filtrar(texto)}
                            value = {this.state.input}
                            style={styles.campo}
                    />
                    <AntDesign name="search1" size={24} color='rgb(234,252,255)' style={styles.icono} />
                </View>

                {
                    this.state.resultados.length === 0 && this.state.buscando === true ?
                    <Text style={styles.aviso}> No hay un usuario que coincida con tu búsqueda</Text>
                    :
                    <FlatList
                            data={this.state.resultados}
                            keyExtractor={Unusuario => Unusuario.id.toString()}
                            renderItem={({ item }) => 
                                <Text onPress={() => this.irAPerfil(item)} style={styles.lista}>{item.data.owner}</Text>
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
        padding: 5,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    campo: {
        backgroundColor: 'rgb(234,252,255)',
        width: 300,
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
        backgroundColor: 'rgb(234,252,255)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5,
    },    
    aviso: {
        fontFamily: 'Courier',
        fontSize: 13,
        marginTop: 10,
    },
    lista: {
        backgroundColor: 'rgb(94, 171, 194)',
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'left',
        padding: 8,
        color: 'rgb(234,252,255)',
    },
    icono:{
        marginLeft: 10
    }
})

export default Busqueda;
