import React, {Component} from "react";
import {View, Text, Pressable, StyleSheet, FlatList} from "react-native";
import {auth, db} from "../firebase/config"; 

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {usuario: [], loading: true, posteos: [] }
    }

        componentDidMount(){
            db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({id: doc.id, data: doc.data()})
                })
                this.setState({
                    posteos: posts
                })
            });

            db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let users = []
                docs.forEach(doc => {
                    users.push({id: doc.id, data: doc.data()})
                })
                this.setState({
                    usuario: users
                })
            }); 
    };

    render(){
        return(
            <View style={styles.container}>

                <FlatList 
                data={ this.state.usuario }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <Text>{item.data.usuario}</Text>}
                />

                <Text>{auth.currentUser.email}</Text>
                <Text style={styles.posteo}> Ultimos Posteos </Text>
                <FlatList style={styles.flatlist}
                data={ this.state.posteos }
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({item}) => (<View style={styles.card}>
                                            <Text style={styles.usuario}>{auth.currentUser.email}</Text>
                                            <Text style={styles.texto}>{item.data.mensaje}</Text>
                                        </View> )}
                />

                <Pressable style={styles.boton} onPress={ ()=> this.props.navigation.navigate('Login')}>
                    <Text style={styles.textoBoton}> Desloguearse </Text>
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
    text: {
        textAlign: "center"
    },
    boton: {
        backgroundColor:'#5ab3beff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderCurve: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#5ab3beff',
        marginTop: 20,
        width: 120
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 12,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#efefefff",
        shadowColor: "#000000ff",
        shadowOpacity: 0.06,
    },
    flatlist: {
    	width: '100%',
        flex: 1
    },
    usuario: {
        color: "#6B7280", 
        fontSize: 13,
        marginBottom: 6,
    },
    texto:{
        fontSize: 16,
        lineHeight: 22,
        color: "#111827", 
        marginBottom: 10,
    },
    posteo:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    }
});

export default Profile 