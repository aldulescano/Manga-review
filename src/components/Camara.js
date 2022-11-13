import React, {Component} from 'react';
import {Camera } from 'expo-camera';
import {auth} from '../firebase/config';
import {storage} from '../firebase/config';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

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
            .then( () =>   {console.log(auth.currentUser.email); this.setState({
                permiso: true
            })})
        
            .catch( e => console.log(e))
    }

    Fotografiar(){
     
        this.metodosCamara.takePictureAsync()
            .then( foto => {
                this.setState({
                    urlTemporal: foto.uri,
                    mostrarCamera: false
                })
            })
            .catch( e => console.log(e))
    }

    guardar(){
        fetch(this.state.urlTemporal)
    .then(res => res.blob())
            .then( img => { 
           
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
                refStorage.put(img)
                    .then(()=>{
                        refStorage.getDownloadURL() 
                        .then( url => this.props.onImageUpload(url))
                    })
            })
            .catch(e => console.log(e))
    }

    cancelar (){

        this.setState({
            urlTemporal: '',
            mostrarCamera: true
        })
    }

    render(){
        return(
            <View>
            {
                this.state.permiso ? 
                this.state.mostrarCamera ?
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
                <View>
                        <Image 
                            style={styles.preview}
                            source={{uri: this.state.urlTemporal}}
                            resizeMode='cover'
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.cancelar()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>this.guardar()}>
                            <Text>Aceptar</Text>
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
    preview:
    {
        height: '80vh',
        width: '80vw',
    },
}) 


export default Camara;