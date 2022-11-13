import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import { AntDesign, FontAwesome  } from '@expo/vector-icons'; 

class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes:   this.props.posteoData.data.likes.length ,                
            propioLike:false
        }
    }

    componentDidMount(){
       
        if(this.props.posteoData.data.likes.includes(auth.currentUser.email)){ 
            this.setState({
                propioLike:true
            })
        }
    }

    like(){
      
        db.collection('posteos')
            .doc(this.props.posteoData.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) 
            })
            .then(()=> this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes +1,
                propioLike: true, 
                })
            )
            .catch(e=>console.log(e))
    }

    unlike(){
        this.setState({
            cantidadDeLikes: this.state.cantidadDeLikes -1,
            propioLike: false, 
            })
    }

    render(){
        return(
            <View style= {styles.container}>
                <Text style={styles.usuario}> {this.props.posteoData.data.creador} </Text>
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.posteoData.data.imagen}} 
                    resizeMode='cover'
                />
                <Text style= {styles.descripcion}> {this.props.posteoData.data.descripcion} </Text>

                <View style= {styles.iconos}>
                    { this.state.propioLike ? 
                        <TouchableOpacity onPress={ ()=> this.unlike() }>
                            <AntDesign name="hearto" size={24} color="black" />                    
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={ ()=> this.like() }>
                            <AntDesign name="heart" size={24} color="black" />
                        </TouchableOpacity>
                    }
                    <FontAwesome name="comment-o" size={24} color="black" />                
                </View>
                <Text> Cantidad de Likes: {this.state.cantidadDeLikes} </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(94, 171, 194)',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 15
    },
    usuario: {
        alignSelf: 'flex-start',
        fontFamily: 'Courier',
        fontSize: 16,
        padding: 5
    },
    descripcion: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 12,
        borderRadius: 10,
        padding: 10,
        margin: 5
    },
    iconos:{
        flexDirection: 'row'
    },
    comentario: {
        fontSize: 30
    },
    photo:{
        height: '40vh',
        width: '40vw'}
    }) 
    
    export default Posteo;