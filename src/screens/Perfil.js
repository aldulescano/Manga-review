import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-web';
import { auth, db } from '../firebase/config';

class Perfil extends Component {
    constructor(){
        super();
        this.state = {
            usuario: [],
            posteos: [],
            error: ''
        }
    }


    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                console.log(docs)
                let info = [];
                docs.forEach(doc => {
                    info.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        usuario: info
                    })
                })
            }
        )
    }

    borrarCuenta(){
        auth.currentUser.delete()
            .then( () => {
                this.props.navigation.navigate("Portada")
            })
            .catch(error => 
                this.setState({
                error: 'No se ha podido borrar su cuenta. intente denuevo más tarde'
            })
        )
    }

    cerrarSesion(){
        auth.signOut()
        this.props.navigation.navigate("Inicio")
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
                            <Text style={styles.titulo}> {this.state.usuario.userName}</Text>
                            <View>
                                <Text onPress={ () => this.cerrarSesion()} style={styles.opcion}>Cerrar sesión</Text>
                                <Text onPress={ () => this.borrarCuenta()} style={styles.opcion}>Borrar cuenta</Text>
                                <Text style={styles.error}>{this.state.error}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.biografia}>Esta es una información poco interesante sobre mi</Text>
                        <Text style={styles.informacion}>esteessuemail@gmail.com</Text>
                        <Text style={styles.informacion}>Cantidad de posts: {this.state.posteos.length}</Text>
                    </View>
                    {this.state.posteos.length >= 1 ?
                        <FlatList 
                            data = { this.state.posteos}
                            keyExtractor = { objeto => objeto.id.toString()}
                            renderItem = { ({objeto}) => <Text> Aca va el post</Text>}
                        />
                    :
                        <Text style={styles.aviso}> Aun no hay publicaciones</Text>
                    }
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
    informacion: {
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
    },
    aviso: {
        fontFamily: 'Courier',
        fontSize: 13,
        marginTop: 10,
    },
    error: {
        fontFamily: 'Courier',
        fontSize: 13,
        margin: 20,
        color: 'rgb(217,33,33)'
    }
});


export default Perfil;