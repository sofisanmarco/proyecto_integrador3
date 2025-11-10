import React, {Component} from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { db, auth } from "../firebase/config";

class NuevoPost extends Component{
    constructor(props){
        super(props)
        this.state = {mensaje: ''}
    };

    onSubmit(){
            db.collection('posts').add({
                    owner: auth.currentUser.email,
                    mensaje: this.state.mensaje,
                    createdAt: Date.now(),
                    likes:[],
                })
            .then(res => console.log(res))
            .catch(error => console.log(error))
            
            this.props.navigation.navigate('Home')
        }

    render(){
        return(
            <View style={styles.container}>

                <Text style={styles.titulo}> Crear nuevo post </Text>

                <TextInput keyboardType="dafault" 
                            placeholder="Escribe aqui tu comentario" 
                            onChangeText={text => this.setState({mensaje: text})} 
                            value={this.state.mensaje} 
                            style={styles.input}/>

                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                        <Text style={styles.textoBoton}>Publicar</Text>
                </Pressable>
                
            </View>
        )
    }
};

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: 'bold'
    }, 
    
    container: {
        marginLeft: 10,
        marginTop: 20,
        paddingHorizontal: 10
    },

    text: {
        textAlign: "center",
    },
    input: {
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderCurve: 6,
        marginVertical: 10,
        backgroundColor: "#ffffffff",
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eaeaeaff",
        shadowColor: "#030303ff",
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    boton: {
        backgroundColor:'#ed89b1ff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderCurve: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e877a4ff',
        width: 120,
        alignSelf: 'center',
        marginTop: 10
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    }
})

export default NuevoPost;