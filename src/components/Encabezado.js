import { View, StyleSheet, Image, Text } from "react-native-web";


function Encabezado() {
    return (
        <View>
            <View style={styles.encabezado}>
                <Image
                    style={styles.icono}
                    source={require('../../assets/iconoAzul.png')}
                    resizeMode='contain'
                />
                <Text style={styles.nombre}>Manga Review</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
        encabezado: {
        backgroundColor: 'rgb(94, 171, 194)',
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    nombre: {
        fontFamily: 'Courier',
        marginLeft: 5,
        alignSelf: 'center'
    },
    icono:{
        height: 40,
        width: 40
    }
})

export default Encabezado;