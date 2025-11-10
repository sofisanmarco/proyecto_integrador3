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
        post: null,
    };
}

componentDidMount() {
    const postId = this.props.route.params.id;
    db.collection("posts")
        .doc(postId)
        .onSnapshot((doc) => {
        const data = doc.data();
        const comentarios = data && data.comentarios ? data.comentarios : [];
        this.setState({
            post: data,
            comentarios: comentarios,
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
    const likesCount =
        this.state.post && this.state.post.likes
        ? this.state.post.likes.length
        : 0;

    return (
    <View style={styles.container}>

    {this.state.post && (
    <View style={styles.post}>
        <Text style={styles.postUsuario}>{this.state.post.owner}</Text>
        <Text style={styles.postMensaje}>{this.state.post.mensaje}</Text>
        <Text style={styles.postLikes}>
        ❤️ {likesCount} likes
        </Text>
    </View>
    )}


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
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "stretch",
},
usuario: { 
    color: "#6B7280", 
    fontSize: 13 
},
postUsuario: { 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 10 
},
postMensaje: { 
    fontSize: 15, 
    color: "#444", 
    marginBottom: 8 
},
postLikes: { 
    fontSize: 13, 
    color: "#999" 
},
post: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "stretch",
},

});

export default ComentarPost;
