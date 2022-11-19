import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';

class EdicionPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: '',
            contraseñaVieja: '',
            contraseña: '',
            bio: '',
            errors: '',
        }
    };

    autenticar = (contraseñaVieja) => {
        const credencial = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, contraseñaVieja)
        auth.currentUser.reauthenticateWithCredential(credencial)
        return auth.currentUser.reauthenticateWithCredential(credencial);
    };


    actualizarUsuario() {
        db.collection('users')
            .doc(this.props.route.params.id)
            .update({
                userName: this.state.usuario
            }).then( () => this.setState({
                mensaje: 'se actualizo correctamente'
            }))
            .catch((error) => {
                this.setState({
                    errors: error
                })
            })
    };


    actualizarBiografia() {
        db.collection('users')
            .doc(this.props.route.params.id)
            .update({
                bio: this.state.bio
            })
            .catch((error) => {
                this.setState({
                    errors: error
                })
            })
    };

    actualizarContraseña() {
        this.autenticar(this.state.contraseñaVieja)
            .then(() => {
                auth.currentUser.updatePassword(
                    this.state.contraseña
                ).catch((error) => {
                    this.setState({
                        errors: error
                    })
                })
            })

    };

    actualizarPerfil() {
        {
            this.state.usuario != '' ?
                this.actualizarUsuario()
                :
                console.log('No se actualizó el nombre')
        }
        {
            this.state.bio != '' ?
                this.actualizarBiografia()
                :
                console.log('No se actualizó la bio')
        }
        {
            this.state.contraseña != '' && this.state.contraseñaVieja != '' ?
                this.actualizarContraseña()
                :
                console.log('No se actualizó la contraseña')
        }
        this.props.navigation.navigate('MiPerfil')
        this.setState({
            usuario: '',
            contraseña: '',
            bio: ''
        })
    };

    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.icono}
                    source={require('../../assets/iconoDefault.png')}
                    resizeMode='contain'
                />

                <Text style={styles.titulo}>Edita tu Perfil</Text>
                <Text style= {styles.subtitulo}>Rellena los campos que desea modificar</Text>

                <View style={styles.form}>
                    <Text style={styles.errors}>{this.state.errors}</Text>
                    <TextInput
                        placeholder='Nombre de usuario'
                        keyboardType='default'
                        onChangeText={texto => this.setState({ usuario: texto })}
                        value={this.state.usuario}
                        style={styles.campo}
                    />
                    <TextInput
                        placeholder='Biografia'
                        keyboardType='default'
                        onChangeText={texto => this.setState({ bio: texto })}
                        value={this.state.bio}
                        style={styles.campo}
                    />
                    <TextInput
                        placeholder='Contraseña actual'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={texto => this.setState({ contraseñaVieja: texto })}
                        value={this.state.contraseñaVi}
                        style={styles.campo}
                    />
                    <TextInput
                        placeholder='Contraseña nueva'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={texto => this.setState({ contraseña: texto })}
                        value={this.state.contraseña}
                        style={styles.campo}
                    />

                    <TouchableOpacity onPress={() => this.actualizarPerfil(this.state.usuario, this.state.contraseña, this.state.contraseñaVieja, this.state.bio)} >
                        <Text style={styles.boton}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MiPerfil')} >
                        <Text style={styles.boton}>Cancelar</Text>
                    </TouchableOpacity>

                    <Text style= {styles.error}> {this.state.errors}</Text>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234,252,255)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontFamily: 'Courier',
        fontSize: 22,
        margin: 20
    },
    errors: {
        fontFamily: 'Courier',
        fontSize: 13,
        margin: 20,
        color: 'rgb(217,33,33)'
    },
    form: {
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
    botonerror: {
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(105,105,105)',
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
    icono: {
        height: 180,
        width: 180
    },
    error: {
        fontFamily: 'Courier',
        fontSize: 13,
        margin: 20,
        color: 'rgb(217,33,33)'
    },
    subtitulo: {
        fontFamily: 'Courier',
        fontSize: 13,
        marginBottom: 10
    },
})


export default EdicionPerfil;