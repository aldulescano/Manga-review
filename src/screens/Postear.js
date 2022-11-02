import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Postear extends Component {
    constructor(){
        super()
        this.state = {
            foto: '',
            textoD: '',
          
        }
    }


    Postear(email,  imagen, Descripcion, likes, comentario  ){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                
                db.collection('posteos').add({
                    emailUsuario:  email,
                    imagen: foto,
                    Descripcion: textoD,
                    likes: '',
                    comentarios: '',
                    createdAt: Date.now()
                })
                .then(() => {
                    this.setState({
                        foto: '',
                        textoD: '',
                                    
                    })

                    this.props.navigation.navigate('Principal')
                })
                .catch(err => console.log(err))    
                
            })
            .catch(err => console.log(err))
    }
    render(){
        return(
            <View style={styles.container}>
                
                <Image
                    style = {styles.icono}
                    source = {require('../../assets/iconoDefault.png')}
                    resizeMode = 'contain'
                />

                <Text style={styles.titulo}>Haz un post!</Text>

                <View style={styles.form}>
                      
                    <TextInput 
                        placeholder= 'Foto'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({foto : texto})}
                        value = {this.state.foto}
                        style={styles.campo}
                    />       

                    <TextInput 
                        placeholder= 'Descripcion'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({textoD : texto})}
                        value = {this.state.bio}
                        style={styles.campo}
                    />  

                    <TouchableOpacity onPress={ () => this.Postear ( this.state.textoD, this.state.foto)}>
                        <Text onPress={ () => this.props.navigation.navigate ('Principal')} style={styles.boton}>Postear</Text>
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

export default Postear;