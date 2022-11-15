import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import Camara from '../components/Camara';

class Registro extends Component {
    constructor(){
        super()
        //Seteamos un state inicial cero para lograr los inputs vacios. Tambien creamos propiedad errors para el catch//
        this.state = {
            email: "",
            contraseña: "",
            usuario: "",
            bio: "",
            foto: "",
            errors: "",
            mostrarCamara: false, 
        }
    }

onImageUpload(url) {
        this.setState({
            foto: url,
            mostrarCamara: false,
        })
    }
registrarUsuario(email,pass, userName, bio, foto){
    //Lo que queremos hacer es registrar en Firebase que damos de alta al usuario y si el registro sale bien entonces redireccionar a Login //
    //Hacemos uso de auth de firebase y aprovechamos el método createUserWithEmailAndPassword con los parámetros obligatorios que son email y pass//
    auth.createUserWithEmailAndPassword(email,pass)
        .then(res =>{
            //Este método es asincronico por lo que retorna una promise, si se cumple la promise entonces tenemos sucede un then. En el then hacemos uso de add para agregar la coleccion users y dar de alta al usuario con los valores propios de este usuari//
                db.collection("users").add({
                    owner:email,
                    userName: userName, 
                    bio: bio,
                    foto: foto,
                    createdAt: Date.now()
                })
                //Add tambien retorna una promesa por lo que si se cumple devolverá lo que suceda en el then
                .then(()=>{
                    this.setState({
                        email: "",
                        contraseña: "",
                        usuario: "",
                        bio: "",
                        foto: "",
                        errors: ""
                    })
                    //Redireccionamiento a login//
                    this.props.navigation.navigate("Inicio")
                })
                .catch(error => console.log(error))    
        })
        .catch(error => 
            this.setState({
            errors: `Tienes un error: ${error.message}`
        })
        )}

    

    render(){
        return(
            <View style={styles.container}>

                <Image
                    style = {styles.icono}
                    source = {require('../../assets/iconoDefault.png')}
                    resizeMode = 'contain'
                />
                <Text style={styles.titulo}>Regístrate</Text>
                <View style={styles.form}>
                <Text style={styles.errors}>{this.state.errors}</Text>


                    <TextInput 
                        placeholder= 'Email'
                        keyboardType= 'email-address'
                        onChangeText={ 
                            texto => this.setState({
                                email : texto
                            })
                        }
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
                    <TextInput 
                        placeholder= 'Nombre de Usuario'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({usuario : texto})}
                        value = {this.state.usuario}
                        style={styles.campo}
                    />
                    <TextInput 
                        placeholder= 'Biografía'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({bio : texto})}
                        value = {this.state.bio}
                        style={styles.campo}
                    />  


                
                        {
                        this.state.mostrarCamara ?
                        <View style={{width: "125vw", heigth: "125vh"}}>
                            <Camara onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({mostrarCamara:true})}>
                            <Text style={styles.botonFoto} > Subir foto de perfil</Text>
                        </TouchableOpacity>
                    }

            

            {
                this.state.email =="" || this.state.contraseña =="" || this.state.usuario == "" ? 
                    <TouchableOpacity>
                        <Text style={styles.botonerror}>Registrarme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.registrarUsuario ( this.state.email, this.state.contraseña, this.state.usuario, this.state.bio, this.state.foto)}>
                        <Text style={styles.boton}>Registrarme</Text>
                    </TouchableOpacity>
            }
                    <Text onPress={ () => this.props.navigation.navigate ("Inicio")} style={styles.link}>¿Ya tenés una cuenta? Inicia Sesión</Text>
                    
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
    form:{
        backgroundColor: 'rgb(94, 171, 194)',
        borderRadius: 10,
        padding: 15
    },
    errors: {
        fontFamily: 'Courier',
        fontSize: 11,
        margin: 10,
        color: 'rgb(217,33,33)'
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
        backgroundColor: 'rgb(0,170,228)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    },
    botonFoto: {
        fontFamily: 'Courier',
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'rgb(90,190,22)',
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
        height: 120,
        width: 120
    }
})

export default Registro;

