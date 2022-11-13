import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

class Posteo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidadDeLikes: this.props.posteoData.data.likes.length,
            propioLike: false,
            comentarios: this.props.posteoData.data.comentarios.sort((a, b) => b.createdAt - a.createdAt)
        }
    }

    componentDidMount() {

        if (this.props.posteoData.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                propioLike: true
            })
        }
    }

    like() {

        db.collection('posteos')
            .doc(this.props.posteoData.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes + 1,
                propioLike: true,
            })
            )
            .catch(e => console.log(e))
    }

    unlike() {
        db.collection('posteos')
            .doc(this.props.posteoData.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes - 1,
                propioLike: false,
            })
            )
            .catch(e => console.log(e))
    }

    render() {
        return (
            <View style = {styles.container}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Perfil', { email: this.props.posteoData.data.creador })}>
                    <Text style = {styles.usuario}>{this.props.posteoData.data.creador} </Text>
                </TouchableOpacity>

                <Image
                    style={styles.photo}
                    source={{ uri: this.props.posteoData.data.imagen }}
                    resizeMode='cover'
                />
                <Text style = {styles.descripcion}> {this.props.posteoData.data.descripcion} </Text>

                <View style = {styles.inferior}>

                    <View style= {styles.likesSeccion}>
                        {this.state.propioLike ?
                            <TouchableOpacity onPress={() => this.unlike()}>
                                <FontAwesome name="heart" size={24} color="rgb(234,252,255)" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.like()}>
                                <FontAwesome name="heart-o" size={24} color="rgb(234,252,255)" />                      
                            </TouchableOpacity>
                        }
                        <Text style= {styles.textito}> Likes: {this.state.cantidadDeLikes} </Text>
                    </View>

                    <View style = {styles.comentariosSeccion}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", { id: this.props.id })}>
                            <FontAwesome name="comment-o" size={24} color="rgb(234,252,255)" />
                        </TouchableOpacity>
                    <Text  style= {styles.textito}> Comentarios: {this.state.comentarios.length} </Text>
                    </View>

                </View>

                <FlatList
                    data={this.state.comentarios.slice(0, 4)}
                    keyExtractor={unComentario => unComentario.createdAt.toString()}
                    renderItem={({ item }) => <Text>{item.creador} comentó: <Text> {item.comentarios} </Text> </Text>}
                />

            </View>




        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(94, 171, 194)',
        alignItems: 'center',
        borderRadius: 20,
        margin: 25,
        marginBottom: 5,
        padding: 10
    },
    usuario: {
        alignSelf: 'flex-start',
        fontFamily: 'Courier',
        fontSize: 14,
        padding: 10,
        color: 'rgb(234,252,255)'
    },
    descripcion: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 12,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        width: 155,
        justifyContent: 'center',
        color: 'rgb(51, 74, 82)'
    },
    inferior: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },  
    likesSeccion: {
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10
    },
    comentariosSeccion: {
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10
    },
    textito: {
        fontSize: 11,
        color: 'rgb(234,252,255)',
        marginTop: 5
    },
    comentario: {
        fontSize: 30
    },
    photo: {
        height: '40vh',
        width: '40vw',
        borderColor: 'rgb(234,252,255)',
        borderWidth: 5
    }
})

export default Posteo;