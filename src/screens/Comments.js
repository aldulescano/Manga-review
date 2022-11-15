import React, { Component } from 'react'
import firebase from 'firebase'
import {db, auth} from "../firebase/config"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'


class Comments extends Component {
constructor (props){
    super (props)
    this.state = {
        id:this.props.route.params.id,
        comentario:"",
        comentarios: [],
    }
}

componentDidMount(){
    db.collection('posts').doc(this.state.id).onSnapshot(
        docs => {
            this.setState({
                comentarios: docs.data().comentarios
            })
        })
};

subirComentario(comentario){
    db.collection("posts")
    .doc(this.state.id)
    .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({owner:auth.currentUser.email,comentario:comentario,createdAt: Date.now()})  
})
.then(() => {
    this.setState({
        comentario: "",     
}) })
}


    render(){
        return(
            <View> 
            <Text> Comentarios del post actual</Text>

            {this.state.comentarios == 0 ?
            
            <View style={styles.container}> 
            <Text  > Aún no hay comentarios. Sé el primero en opinar </Text>
            <SubirComentario id={this.state.id}/>
            </View>
            :
            <FlatList 
                data={this.state.comentarios}
                keyExtractor={ unComentario => unComentario.createdAt.toString()}
                renderItem={ ({item}) => <Text>{item.creador} comentó: {item.comentarios}</Text>}
            /> 
            }
            <TextInput 
                placeholder='Agregue un comentario'
                keyboardType='default'
                onChangeText={comentario=> this.setState({comentario:comentario})}
                value={this.state.comentario}
            />
            {this.state.comentario === "" ?
                <></>
                :
                <TouchableOpacity onPress={()=> this.subirComentario(this.state.comentario) }>
                    <Text>Subir comentario a este posteo</Text>
                </TouchableOpacity> 

        

}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:  {
        backgroundColor: 'rgb(234,252,255)'
                }
})

export default Comments;