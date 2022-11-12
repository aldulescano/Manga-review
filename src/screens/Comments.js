import React, { Component } from 'react'
import firebase from 'firebase'
import {db, auth} from "../firebase/config"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'


import Posteo from '../components/Posteo'
import ComentarioForm from "../components/ComentarioForm"


class Comments extends Component {
  constructor (props){
    super (props)
    this.state = {
       id:this.props.route.params.id,
       data:"",
       comentarios:"",

    }
}

componentDidMount(){
    db.collection('posteos').doc(this.state.id).onSnapshot(doc=> {this.setState({
        data: doc.data(),   
    }
    )
    })
}

subirMiComentario(comentario){
    db.collection('posteos')
    .doc(this.state.id)
    .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
        owner:auth.currentUser.email,
        comentarios:comentario,
        createdAt: Date.now(),
    })  
})
.then(() => {
    this.setState({
        comentarios: "",     
}) })
}



    render(){
        return(
            <View> 
                <Text> Comentarios del posteo actual </Text>
{
                this.state.data.comentarios.length == 0 ? 
                    <Text > Aún no hay comentarios. Sé el primero en opinar </Text>
            :
            <View> 
            <FlatList 
            data={this.state.data.comentarios.sort((a,b)=> b.createdAt - a.createdAt)}
            keyExtractor={ unComentario => unComentario.createdAt.toString()}
            renderItem={ ({item}) => <Text>{item.creador} comento: {item.comentarios}</Text>}
            /> 
            </View> 
}

            </View>

        )
    }
}


export default Comments;