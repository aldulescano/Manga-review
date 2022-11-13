import React, { Component } from 'react'
import firebase from 'firebase'
import {db, auth} from "../firebase/config"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import Posteo from "../components/Posteo"
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath'
import Subircomentario from '../components/Subircomentario'


class Comments extends Component {
constructor (props){
    super (props)
    this.state = {
    id:this.props.id,
    data:"",
    comentario:"",
    comentarios:this.props.comentarios
    }
}

componentDidMount(){
    db.collection('posteos').doc(this.state.id).onSnapshot(doc=> {this.setState({
        data: doc.data(),  
    }
    )
    })
}


    render(){
        return(
            <View> 
                <Text> Comentarios del posteo actual </Text>

            {this.state.comentarios == 0 ?
            <View style={styles.container}> 
            <Text  > Aún no hay comentarios. Sé el primero en opinar </Text>
            <Subircomentario id={this.state.id} data={this.state.data}/>
            </View>
            :
            <FlatList 
            data={this.state.comentarios}
            keyExtractor={ unComentario => unComentario.createdAt.toString()}
            renderItem={ ({item}) => <Text>{item.creador} comentó: {item.comentarios}</Text>}
            /> 

        

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