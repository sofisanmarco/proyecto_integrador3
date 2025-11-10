import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {posts: [], loading: true}
    };

    componentDidMount(){
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let posteos = []
                docs.forEach( doc => {
                    posteos.push({
                        id: doc.id,
			            data: doc.data()
                    })

                    this.setState({
                        posts: posteos,
                        loading: false
                    })
                })
        })
    };

    darLike(id, likes){
        db.collection('posts')
        .doc(id)
        .update(
            likes.includes(auth.currentUser.email) ?
            {likes : firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)}
            :
            {likes : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)}    
        )
        .then( res => console.log(res))
        .error( e => console.log(e))
    }

    render() {
        return (
        <View style={styles.container}>
            <FlatList
            style={styles.flatlist}
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                <Text style={styles.usuario}>{item.data.owner}</Text>
                <Text style={styles.texto}>{item.data.mensaje}</Text>
    
                <Pressable onPress={() => this.darLike(item.id, item.data.likes)}>
                    <Text style={styles.like}>
                    {item.data.likes?.includes(auth.currentUser.email)
                        ? "💔 Quitar Me gusta"
                        : "❤️ Me gusta"}
                    </Text>
                </Pressable>
    
                <Text style={styles.likeCount}>
                    {item.data.likes ? item.data.likes.length : 0} Me gusta
                </Text>

                <Pressable onPress={() => this.props.navigation.navigate('ComentarPost', { id: item.id })}>
                    <Text style={styles.comentario}>💬 Comentar</Text>
                </Pressable>

                </View>
            )}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginTop: 75,
        paddingHorizontal: 10,
        flex: 1,
    },
    card: {
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
    like: {
        color: "#007bff",
        fontSize: 14,
        marginTop: 5 
    },
    likeCount: { 
        color: "#333",
        fontSize: 12,
        marginTop: 3 
    },
    comentario: {
        color: "#007bff",
        fontSize: 14,
        marginTop: 5 
    },
});

export default Home;