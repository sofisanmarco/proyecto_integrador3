import React, {Component} from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {posts: [], loading: true}
    };

    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posteos = []
                docs.forEach( doc => {
                    users.push({
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

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                        style={styles.flatlist}
                        data = {this.state.posts}
                        keyExtractor={ item => item.id.toString() }
                        renderItem={ ({item}) => <Text>{item.data.mensaje}</Text> }/>
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

    flatlist: {
    	width: '100%',
        flex: 1
   },

    boton: {
        padding: 4,
        backgroundColor: 'grey',
        marginBottom: 4,
        borderCurve: 4,
        width: 150,
        marginTop: 10
    },
    text: {
        textAlign: "center"
    }
})

export default Home;