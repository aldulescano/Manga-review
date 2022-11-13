import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome  } from '@expo/vector-icons'; 

class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes:  this.props.posteoData.data.likes.length ,                
            propioLike:false,
            comentarios: this.props.posteoData.data.comentarios.sort((a,b)=> b.createdAt - a.createdAt)
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
        db.collection('posteos')
        .doc(this.props.posteoData.id) 
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) 
        })
        .then(()=> this.setState({
            cantidadDeLikes: this.state.cantidadDeLikes -1,
            propioLike: false, 
            })
        )
        .catch(e=>console.log(e))
    }

    render(){
        return(
            <View>
            
            
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Perfil',{email:this.props.posteoData.data.creador}) }>
            <Text >Subido por {this.props.posteoData.data.creador} </Text>
            </TouchableOpacity>

                <Image 
                    style={styles.photo}
                    source={{uri: this.props.posteoData.data.imagen}} 
                    resizeMode='cover'
                />
                <Text> {this.props.posteoData.data.descripcion} </Text>

                <Text> Cantidad de Likes: {this.state.cantidadDeLikes} </Text>
                <Text > Cantidad de comentarios:{this.state.comentarios.length} </Text>


                { this.state.propioLike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>No me gusta más</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }


                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', {  
                    id:this.props.id, 
                    navigation: this.props.navigation,
                    data: this.props.posteoData.data,
                    comentarios: this.props.posteoData.data.comentarios
                }
                )} >
                <Text>Ver comentarios</Text>
                </TouchableOpacity>
                
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