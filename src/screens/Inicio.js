import React, {Component} from 'react';
import {auth} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Inicio extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            contraseña: "",
            errors: ""
        }
    }

    iniciarUsuario(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                this.props.navigation.navigate("Principal")
            })
            .catch(error => 
                this.setState({
                errors: `Tienes un error: ${error.message}`
            })
            )
    }



    render(){
        return(
            <View style={styles.container}>

            <Text style={styles.errors}>{this.state.errors}</Text>

                <Image
                    style = {styles.icono}
                    source = {require('../../assets/iconoDefault.png')}
                    resizeMode = 'contain'
                />

                <Text style={styles.titulo}>Inicia Sesión</Text>

                <View style={styles.form}>
                <Text style={styles.errors}>{this.state.errors}</Text>
                    <TextInput 
                        placeholder= 'Email'
                        keyboardType= 'email-address'
                        onChangeText={ texto => this.setState({email : texto})}
                        value = {this.state.email}
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


{
                this.state.email =="" || this.state.contraseña =="" ? 
                    <TouchableOpacity>
                        <Text style={styles.botonerror}>Ingresar</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.iniciarUsuario (this.state.email, this.state.contraseña)} >
                        <Text style={styles.boton}>Ingresar</Text>
                    </TouchableOpacity>
}

                    <Text onPress={ () => this.props.navigation.navigate ('Registro')} style={styles.link}>¿No tenés una cuenta? Registrate</Text>
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
        fontSize: 19,
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


export default Inicio;