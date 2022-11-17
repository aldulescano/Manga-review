import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-web';
import { db } from '../firebase/config';

import Encabezado from '../components/Encabezado';
import Posteo from '../components/Posteo';

class Perfil extends Component {
    constructor() {
        super();
        this.state = {
            usuario: [],
            posteos: [],
            error: ''
        }
    }


    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let info = [];
                docs.forEach(doc => {
                    info.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        usuario: info[0].data
                    })
                })
            }
        )

        db.collection('posteos').where("creador", "==", this.props.route.params.email).onSnapshot(
            docs => {
                let posteos = []
                docs.forEach(doc => {
                    posteos.push({
                        data: doc.data(),
                        id: doc.id
                    })
                })
                this.setState({
                    posteos: posteos
                })
            }
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Encabezado />
                    <View style={styles.superior}>
                        {
                            this.state.usuario.foto != '' ?
                                <Image
                                    style={styles.foto}
                                    source={{ uri: this.state.usuario.foto }}
                                    resizeMode='contain'
                                />
                                :
                                <Image
                                    style={styles.foto}
                                    source={require('../../assets/iconoAzul.png')}
                                    resizeMode='contain'
                                />

                        }
                        <View>
                            <Text style={styles.titulo}> {this.state.usuario.userName}</Text>
                            <Text style={styles.biografia}>{this.state.usuario.bio}</Text>
                            <Text style={styles.informacion}>{this.state.usuario.owner}</Text>
                            <Text style={styles.informacion}>Cantidad de posts: {this.state.posteos.length}</Text>
                        </View>
                    </View>
                    {this.state.posteos.length >= 1 ?
                        <FlatList
                            data={this.state.posteos}
                            keyExtractor={onePost => onePost.data.createdAt.toString()}
                            renderItem={({ item }) => <Posteo posteoData={item} />}
                        />
                        :
                        <Text style={styles.aviso}> Aun no hay publicaciones</Text>
                    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(234,252,255)',
        padding: 20,
        flex: 1
    },
    superior: {
        backgroundColor: 'rgb(234,252,255)',
        flexDirection: 'row',
        paddingTop: 40
    },
    titulo: {
        fontFamily: 'Courier',
        fontSize: 18,
        marginLeft: 10
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
        paddingLeft: 12,
        color: 'rgb(115, 115, 115)'
    },
    biografia: {
        fontFamily: 'Courier',
        fontSize: 13,
        margin: 4,
        paddingLeft: 12
    },
    foto: {
        height: 115,
        width: 115,
        marginLeft: 15
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