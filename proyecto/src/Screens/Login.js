import React, {Component} from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { auth, db } from '../firebase/config';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {email: '', password: '', error: '', loggedIn: false}
    };

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if (user){
                this.props.navigation.navigate('HomeMenu', {screen: 'Home'})
            }
    })
    }

    onSubmit(){
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
            this.setState({loggedIn: true}); this.props.navigation.navigate("HomeMenu", {screen: "Home"})})
        .catch(error => {this.setState({error: 'Credenciales inválidas.'})})
    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image}
                       source={require('../../assets/logo.png')}
                       resizeMode='contain'/>

                <Text style={styles.titulo}> Login </Text>

                <TextInput style={styles.input} 
                            keyboardType="email-address" 
                            placeholder="Email" 
                            onChangeText={text => this.setState({email: text})} 
                            value={this.state.email} />

                <TextInput keyboardType="default"
                                            placeholder="Contraseña"
                                            onChangeText={text => this.setState({password: text})}
                                            value={this.state.password}
                                            secureTextEntry={true} 
                                            style={styles.input}/>

                <Text>{this.state.error}</Text>

                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.textoBoton}>Iniciar Sesión</Text>
                </Pressable>

                <Pressable style={styles.register} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.text}>No tengo cuenta</Text>
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

    image: {
        height: 40,
        marginLeft: 40
    },
    
    container: {
        marginLeft: 10,
        marginTop: 20,
        paddingHorizontal: 10,
    },

    register: {
        padding: 4,
        marginBottom: 4,
        borderCurve: 4,
        width: 150,
        marginTop: 10,
        alignSelf: 'center'
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
        alignSelf: 'center'
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    }
})

export default Login;