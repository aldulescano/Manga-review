import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import { FlatList } from 'react-native-web';

class Perfil extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            bio: '',
            foto: '',
            publicaciones: ''
        }
    }

    render(){
        return(
            <View>
                <View style={styles.encabezado}>
                    <Image
                            style = {styles.icono}
                            source = {require('../../assets/iconoAzul.png')}
                            resizeMode = 'contain'
                    />
                    <Text style = {styles.nombre}>Manga Review</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.superior}>
                        <Image
                                style = {styles.foto}
                                source = {require('../../assets/iconoAzul.png')}
                                resizeMode = 'contain'
                        />
                        <View>
                            <Text style={styles.titulo}> Nombre de Usuario</Text>
                            <View>
                                <Text style={styles.opcion}>Cerrar sesión</Text>
                                <Text style={styles.opcion}>Borrar cuenta</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.biografia}>Esta es una información poco interesante sobre mi</Text>
                        <Text style={styles.info}>esteessuemail@gmail.com</Text>
                        <Text style={styles.info}>Cantidad de posts: 15</Text>
                    </View>
                </View>

                <View>
                    <FlatList 
                        data = { this.state.publicaciones}
                        keyExtractor = { objeto => objeto.id.toString()}
                        renderItem = { ({objeto}) => <Text> Aca va el post</Text>}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(234,252,255)',
        padding: 20
    },
    encabezado: {
        backgroundColor: 'rgb(94, 171, 194)',
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    nombre: {
        fontFamily: 'Courier',
        marginLeft: 5,
        alignSelf: 'center'
    },
    superior: {
        backgroundColor: 'rgb(234,252,255)',
        flexDirection:'row',
        paddingTop: 40  ,
        marginBottom: 10
    },
    titulo: {
        fontFamily: 'Courier',
        fontSize: 16,
        margin: 10,
        alignSelf: 'center'
    },
    opcion: {
        backgroundColor: 'rgb(94, 171, 194)',
        fontFamily: 'Courier',
        fontSize: 11,
        margin: 10,
        marginLeft: 15,
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    },
    info: {
        fontFamily: 'Courier',
        fontSize: 11,
        margin: 4,
        flex: 4,
        paddingLeft: 12,
        color: 'rgb(115, 115, 115)'
    },
    biografia: {
        fontFamily: 'Courier',
        fontSize: 13,
        margin: 4,
        paddingLeft: 12
    },
    icono:{
        height: 40,
        width: 40
    },
    foto:{
        height: 115,
        width: 115,
        marginLeft: 15,
        borderRadius: 60
    }
});


export default Perfil;