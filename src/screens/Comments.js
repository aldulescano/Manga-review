import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from "../firebase/config"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.route.params.id,
            comentario: "",
            comentarios: [],
        }
    }

    componentDidMount() {
        db.collection('posteos').doc(this.state.id).onSnapshot(
            docs => {
                this.setState({
                    comentarios: docs.data().comentarios
                })
            })
    };

    subirComentario(comentario) {
        db.collection('posteos')
            .doc(this.state.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({ creador: auth.currentUser.email, comentario: comentario, createdAt: Date.now() })
            })
            .then(() => {
                this.setState({
                    comentario: "",
                })
            })
    }


    render() {
        console.log(this.state.comentarios)
        return (
            <View style={styles.container}>

                <View style={styles.inferior}>
                    {this.state.comentarios == 0 ?

                        <View>
                            <Text style= {styles.aviso}> Aún no hay comentarios. Sé el primero en opinar </Text>
                        </View>
                        :
                        <FlatList
                            data={this.state.comentarios}
                            keyExtractor={unComentario => unComentario.createdAt.toString()}
                            renderItem={({ item }) => <Text style={styles.comentarios}>{item.creador}: {item.comentario}</Text>}
                        />
                    }
                    <TextInput
                        placeholder='Agregue un comentario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ comentario: text })}
                        value={this.state.comentario}
                        style={styles.texto}
                    />
                    {this.state.comentario == "" ?
                        <Text></Text>
                        :
                        <TouchableOpacity onPress={() => this.subirComentario(this.state.comentario)}>
                            <Text style = {styles.boton}>Subir comentario</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(234,252,255)',
        flex: 1
    },
    superior: {
        backgroundColor: 'rgb(94, 171, 194)',
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inferior:{
        backgroundColor: 'rgb(94, 171, 194)',
        borderRadius: 10,
        padding: 15,
        margin: 10
    },
    aviso: {
        fontFamily: 'Courier',
        fontSize: 13,
        marginTop: 10,
    },
    comentarios: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'left',
        padding: 8
    },
    texto: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'left',
        padding: 8,
        borderColor: 'rgb(51, 74, 82)',
        borderWidth: 2
    },
    boton: {
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(94, 171, 194)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5,
        borderColor: 'rgb(234,252,255)',
        borderWidth: 2,
    }
})

export default Comments;