import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class ComentarPost extends Component {
constructor(props) {
    super(props);
    this.state = {
        comentario: "",
        comentarios: [],
    };
}

componentDidMount() {
    const postId = this.props.route.params.id;
    db.collection("posts")
        .doc(postId)
        .onSnapshot((doc) => {
        this.setState({
            comentarios: doc.data().comentarios || [],
        });
        });
    }

agregarComentario() {
    const postId = this.props.route.params.id;
    const nuevoComentario = {
        owner: auth.currentUser.email,
        texto: this.state.comentario,
        createdAt: Date.now(),
    };

    db.collection("posts").doc(postId).update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
    });

    this.setState({ comentario: "" });
}

render() {
    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Comentarios</Text>

        <FlatList
        data={this.state.comentarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <Text style={styles.usuario}>{item.owner}</Text>
                <Text>{item.texto}</Text>
            </View>
        )}
        />

        <TextInput
            style={styles.input}
            placeholder="Escribe un comentario..."
            onChangeText={(text) => this.setState({ comentario: text })}
            value={this.state.comentario}
        />

        <Pressable style={styles.boton} onPress={() => this.agregarComentario()}>
            <Text style={styles.textoBoton}>Publicar</Text>
        </Pressable>
    </View>
    );
}
}

const styles = StyleSheet.create({
container: { 
    padding: 10,
    flex: 1, 
    marginTop: 60 
},
titulo: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10 
},
input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
},
boton: {
    backgroundColor: "#5ab3beff",
    padding: 10,
    width: 120,
},
textoBoton: { 
    color: "#fff", 
    textAlign: "center" 
},
card: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 8,
    marginBottom: 6,
    borderRadius: 6,
},
usuario: { color: "#6B7280", fontSize: 13 },
});

export default ComentarPost;
