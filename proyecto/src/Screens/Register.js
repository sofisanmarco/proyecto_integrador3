import React, {Component} from "react";
import {View, StyleSheet, Text, Pressable, TextInput} from "react-native";
import {auth, db} from "../firebase/config";

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {email: "", password:"", usuario: "", registered: false, error: ""}
    }

    onSubmit(){
        console.log(this.state.email, this.state.password, this.state.usuario)

        if(!this.state.email.includes("@")){
            this.setState({error:"Email mal formateado"})
            return
        }
        if(this.state.password < 6){
            this.setState({error: "La password debe tener una longitud mínima de 6 caracteres"})
            return
        }

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {this.setState({registered: true})
        this.props.navigation.navigate('Login')

        db.collection("users").add({
            owner: auth.currentUser.email,
            email: this.state.email,
            usuario: this.state.usuario,
            createdAt: Date.now()
        })
        .then(res => console.log(res))
        .catch( e => console.log(e))
    
    })

        .catch(error => {
            console.log(error)
            console.log(error.message);
            
            
            this.setState({error: "Fallo el registro"})})
        }

    render(){
        return(
            <View style={styles.container} >

                <Text style={styles.titulo}> Registrarse </Text>

                <TextInput style={styles.input} keyboardType="email-address"
                            placeholder="Email" 
                            onChangeText={text => this.setState({email:text})} value={this.state.email}/>

                <TextInput style={styles.input} keyboardType="default"
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            onChangeText={text => this.setState({password:text})} value={this.state.password}/>

                <TextInput style={styles.input} keyboardType="default"
                            placeholder="Nombre de Usuario"
                            onChangeText={text => this.setState({usuario:text})} value={this.state.text}/>

                <Text> {this.state.error} </Text>

                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.textoBoton}> Registrarse </Text>
                </Pressable>

                <Pressable style={styles.register} onPress={ ()=> this.props.navigation.navigate('Login')}>
                    <Text style={styles.textoBoton} >Ir a Login</Text>
                    
                </Pressable>

            </View>
        )
    }
}

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

    register: {
        padding: 4,
        backgroundColor: 'grey',
        marginBottom: 4,
        borderCurve: 4,
        width: 150,
        marginTop: 10
    },

    text: {
        textAlign: "center"
    },

    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderCurve: 6,
        marginVertical: 10
    },

    boton: {
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderCurve: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width: 120
    },

    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    }
})


export default Register