import React, {Component} from "react";
import {View, Text, Pressable, StyleSheet, FlatList} from "react-native";
import {auth, db} from "../firebase/config"; 

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {usuarios: [], loading: true }
    }

     componentDidMount(){
        db.collection("users").onSnapshot(
            docs =>{
                let users = []
                docs.forEach(doc => {
                    users.push({id: doc.id, data: doc.data()})
                })
                this.setState({
                    usuarios: users,
                    loading: false 
                })
           console.log(usuarios)})
        
    }
    render(){
        return(
            <View>
                <Text style={styles.texto}> Mi perfil </Text>
                <FlatList
                data={ this.state.usuarios }
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({item}) => <Text>{item.data.usuario} {item.data.email} </Text> }
                />
                <Pressable style={styles.boton} onPress={ ()=> this.props.navigation.navigate('Login')}>
                    <Text style={styles.profile}>Desloguearse. Hacer click aquí te lleva a Login.</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    texto: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 200,
        marginTop: 20
    },
    profile:{
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center"
    },
    boton:{
        backgroundColor: "pink",
        width:500,
        marginLeft: 20,
        padding: 4,
        marginTop: 5 
    },
})

export default Profile 