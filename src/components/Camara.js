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
            .then( () =>   { this.setState({
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
                        <TouchableOpacity style={styles.button} onPress={()=>this.Fotografiar()}>
                            <Text style= {styles.boton}>Sacar foto</Text>
                        </TouchableOpacity>
                        <Camera
                            style={styles.cameraBody}
                            type = {Camera.Constants.Type.back}
                            ref={metodosCamara => this.metodosCamara = metodosCamara }
                        />
                    </View>
                :
                <View>
                        <TouchableOpacity style={styles.button} onPress={()=>this.cancelar()}>
                            <Text style= {styles.boton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>this.guardar()}>
                            <Text style= {styles.boton}>Aceptar</Text>
                        </TouchableOpacity>
                        <Image 
                            style={styles.preview}
                            source={{uri: this.state.urlTemporal}}
                            resizeMode='cover'
                        />
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
    boton: {
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(234,252,255)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5,
        fontFamily: 'Courier'
    },
    preview:
    {
        height: '80vh',
        width: '80vw',
    },
}) 


export default Camara;