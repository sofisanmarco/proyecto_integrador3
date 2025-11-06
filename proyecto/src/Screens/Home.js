import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { db, auth } from "../firebase/config";

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {posts: [], loading: true}
    };

    componentDidMount(){
        db.collection('posts').orderBy("createdAt", "asc").onSnapshot(
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

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                        style={styles.flatlist}
                        data = {this.state.posts}
                        keyExtractor={ item => item.id.toString() }
                        renderItem={ ({item}) => (
                        <View style={styles.card}> 
                            <Text style={styles.usuario}> {item.data.owner}</Text>
                            <Text style={styles.texto}>{item.data.mensaje} </Text>
                        </View> )}
                        
                />
            </View>
        )
    }
};

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
   }

})

export default Home;