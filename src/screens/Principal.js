import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native'
import Posteo from '../components/Posteo.js';

import Perfil from './Perfil';
import Menu from '../components/Menu';

class Principal extends Component {
    constructor() {
        super();
        this.state = {
            posteos: [],
        }
    }

    componentDidMount() {
        db.collection('posteos').onSnapshot(
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

                <Image
                    style={styles.icono}
                    source={require('../../assets/iconoDefault.png')}
                    resizeMode='contain'
                />
                <Text style={styles.titulo}> Principal</Text>
                <Text style={styles.titulo}> Posteos </Text>
                <Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Postear')} >Postear</Text>
            
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Posteo posteoData={item} />}
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
        margin: 20
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