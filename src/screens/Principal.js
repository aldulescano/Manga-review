import React, { Component } from 'react';
import { db } from '../firebase/config';
import { View, StyleSheet, Image, FlatList } from 'react-native'

import Posteo from '../components/Posteo.js';
import Encabezado from '../components/Encabezado';

class Principal extends Component {
    constructor() {
        super();
        this.state = {
            posteos: [],
        }
    }

    componentDidMount() {
        db.collection('posteos').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts
                    })
                })

            }
        )
    }

    render() {

        return (

            <View style={styles.container}>

                <Encabezado/>
            
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Posteo posteoData={item} navigation={this.props.navigation} />}
                />

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234,252,255)',
    },
    titulo: {
        fontFamily: 'Courier',
        fontSize: 22,
        margin: 20,
        alignSelf: 'center'
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
    icono: {
        height: 120,
        width: 120
    }
})

export default Principal