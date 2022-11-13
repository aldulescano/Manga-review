import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native'
import Posteo from '../components/Posteo.js';

import Perfil from './Perfil';
import Encabezado from '../components/Encabezado';
// import Menu from '../components/Menu';

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

                <Encabezado/>

                <Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Postear')}> Posteos </Text>
                <Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Perfil')} >Perfil</Text>
            
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Posteo posteoData={item} />}
                />

                {/* <Menu/> */}
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