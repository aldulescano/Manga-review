import React, { Component } from 'react'
import firebase from 'firebase'
import {db, auth} from "../firebase/config"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import Posteo from "../components/Posteo"


class Subircomentario extends Component {
constructor (props){
    super (props)
    this.state = {
    id:this.props.id,
    data:this.props.data,
    comentario:"",
    }
}


subirMiComentario(comentario){
    db.collection("posteos")
    .doc(this.state.id)
    .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({creador:auth.currentUser.email,comentario:comentario,createdAt: Date.now()})  
})
.then(() => {
    this.setState({
        comentario: "",     
}) })
}



    render(){
        return(
            <View> 
            <TextInput 
            placeholder='Agregar comentario'
            style={styles.input}
            keyboardType='default'
            onChangeText={text=> this.setState({comentario:text})}
            value={this.state.comentario}
            />
            
            {this.state.comentario == "" ?
            <TouchableOpacity >
            <Text> Escriba para comentar </Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={()=> this.subirMiComentario(this.state.comentario) }>
            <Text>Subir comentario</Text>
            </TouchableOpacity> 
       } 
            </View> 
        )
}



    }



export default Subircomentario;