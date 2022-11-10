import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

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
        console.log(this.props);
        return(
            <View>
                 <Text> {this.props.posteoData.data.creador} </Text>
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.posteoData.data.imagen}} 
                    resizeMode='cover'
                />
                <Text> {this.props.posteoData.data.descripcion} </Text>
                <Text> Cantidad de Likes: {this.state.cantidadDeLikes} </Text>
                { this.state.propioLike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>No me gusta más</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    photo:{
        height: '40vh',
        width: '40vw'}
    }) 
    
    export default Posteo;