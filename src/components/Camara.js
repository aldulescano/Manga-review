import React, {Component} from 'react';
import {Camera } from 'expo-camera';
import {storage} from '../firebase/config';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class Camara extends Component{
    constructor(props){
        super(props);
        this.state = {
            permiso: false,
            mostrarCamera: true,
            urlTemporal:''
       }

        this.metodosCamara = ''
    }

    componentDidMount(){
      
        Camera.requestCameraPermissionsAsync()
            .then( () =>   {console.log('pepe'); this.setState({
                permiso: true
            })})
        
            .catch( e => console.log(e))
    }

    Fotografiar(){
     
        this.metodosCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlTemporal: photo.uri,
                    mostrarCamera: false
                })
            })
            .catch( e => console.log(e))
    }


    render(){
        return(
            <View>
            {
                this.state.permiso ? 
                    <View style={styles.cameraBody}>
                        <Camera
                            style={styles.cameraBody}
                            type = {Camera.Constants.Type.back}
                            ref={metodosCamara => this.metodosCamara = metodosCamara }
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.Fotografiar()}>
                            <Text>Sacar foto</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <Text>No hay permisos</Text>
            }
            </View>
        )
    }

}
const styles = StyleSheet.create({
    cameraBody: {
        height: '80vh',
        width: '80vw',
    },
    button:{
        height: '20vh',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20
    },
    preview:{
   height:'80%'
    }
}) 


export default Camara;