import React, { Component } from 'react';
import { auth, db, } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

import Encabezado from '../components/Encabezado';
import Camara from '../components/Camara';

class Postear extends Component {
    constructor() {
        super()
        this.state = {
            foto: '',
            descripcion: '',
            createdAt: '',
            mostrarCamara: true,
            likes: [],
            comentarios: [],
        }
    }


    postear() {

        db.collection('posteos').add({
            creador: auth.currentUser.email,
            imagen: this.state.foto,
            descripcion: this.state.descripcion,
            likes: this.state.likes,
            comentarios: this.state.comentarios,
            createdAt: Date.now()
        })
            .then(() => {
                this.setState({
                    descripcion: '',
                    foto: '',
                    createdAt: '',
                    mostrarCamara: true,
                    likes: [],
                    comentarios: [],

                })

                this.props.navigation.navigate('Principal')
            })
            .catch(err => console.log(err))



    }

    onImageUpload(url) {
        this.setState({
            foto: url,
            mostrarCamara: false,
        })
    }
    render() {
        return (
            <View style={styles.container}>

                <Encabezado />

                <Text style={styles.titulo}>Haz un post!</Text>

                <View style= {styles.form}>
                    {
                        this.state.mostrarCamara ?
                            <Camara onImageUpload={url => this.onImageUpload(url)} />
                            :
                            <View>
                                <View>
                                    <TextInput
                                        placeholder='Agrega una descripción'
                                        keyboardType='default'
                                        onChangeText={text => this.setState({ descripcion: text })}
                                        value={this.state.descripcion}
                                        style = {styles.campo}
                                    />

                                    <TouchableOpacity onPress={() => this.postear()}>
                                        <Text style={styles.boton}>Postear</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234,252,255)',
    },
    titulo: {
        alignSelf: 'center',
        fontSize: 22,
        margin: 20,
        fontFamily: 'Courier'
    },
    form: {
        backgroundColor: 'rgb(94, 171, 194)',
        borderRadius: 10,
        padding: 15,
        alignSelf: 'center'
    },
    campo: {
        backgroundColor: 'rgb(234,252,255)',
        alignSelf: 'center',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'center',
        color: 'rgb(115, 115, 115)',
        padding: 10
    },
    boton: {
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(234,252,255)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    }
})

export default Postear;