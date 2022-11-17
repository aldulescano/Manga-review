import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class EdicionPerfil extends Component {
    constructor(){
        super()
        this.state = {
            usuario: '',
            contraseña: '',
            bio: '',
            errors: '',
            mensaje: ''
        }
    }

    actualizarUsuario(){

        {
            this.state.usuario != '' ?
                db.collection('users')
                .doc(auth.currentUser.id)
                .update({
                    userName: this.state.usuario
                })
                .then( () =>{
                    this.setState({
                        mensaje: 'Actualización exitosa'
                    })
                })
                .catch( (error) => {
                    this.setState({
                        errors: error
                    })
                })
            :
            console.log('No se actualizó el usuario')
            
        }

        {
            this.state.bio != '' ?
            db.collection('users')
            .doc(auth.currentUser.id)
            .update({
                bio: this.state.bio
            })
            .then( () =>{
                this.setState({
                    mensaje: 'Actualización exitosa'
                })
            })
            .catch( (error) => {
                this.setState({
                    errors: error
                })
            })
            :
            console.log('No se actualizó la biografía')
            
        }

        {
            this.state.usuario != '' ?
                auth.currentUser.updatePassword(
                    this.state.contraseña
                ).then( () => {
        
                }).catch( (error) => {
                    this.setState({
                        errors: error
                    })
                })
            :
            console.log('No se actualizó la contraseña')
            
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

                <Text style={styles.titulo}>Edita tu Perfil</Text>

                <View style={styles.form}>
                <Text style={styles.errors}>{this.state.errors}</Text>
                    <TextInput 
                        placeholder= 'Nombre de usuario'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({usuario : texto})}
                        value = {this.state.usuario}
                        style={styles.campo}
                    />
                    <TextInput 
                        placeholder= 'Contraseña'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ texto => this.setState({contraseña : texto})}
                        value = {this.state.contraseña}
                        style={styles.campo}
                    />  
                    <TextInput 
                        placeholder= 'Biografia'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({bio : texto})}
                        value = {this.state.bio}
                        style={styles.campo}
                    />          

                    <TouchableOpacity onPress={ () => this.actualizarUsuario (this.state.usuario, this.state.contraseña, this.state.bio)} >
                        <Text style={styles.boton}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('MiPerfil')} >
                        <Text style={styles.boton}>Cancelar</Text>
                    </TouchableOpacity>

                </View>
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
    errors: {
        fontFamily: 'Courier',
        fontSize: 13,
        margin: 20,
        color: 'rgb(217,33,33)'
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
    icono:{
        height: 180,
        width: 180
    }
})


export default EdicionPerfil;