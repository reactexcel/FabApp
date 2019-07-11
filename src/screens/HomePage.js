import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { Container, Content, Button, } from 'native-base';
import Header from "../generic/Header";
import LinearGradient from 'react-native-linear-gradient';

export default class HomePage extends Component {
    static navigationOptions = {
        header: null
      };
    onCategorySelect=(navigationPath)=>{
        this.props.navigation.navigate(navigationPath)
    }
    render() {
        return (
            <View style={styles.wrapper}>
                {/* <Header/> */}
                <LinearGradient colors={['#000000', '#000000']} style={styles.wrapper}>
                    <View style={styles.buttonsWrapper}>
                        <Button onPress={()=>this.onCategorySelect("Exebition")} block style={styles.button1}>
                            <Text style={styles.text}>Admin</Text>
                        </Button>
                        <Button  block style={styles.button2}>
                            <Text style={styles.text}>Executer</Text>
                        </Button>
                        <Button block style={styles.button3}>
                            <Text style={styles.text}>Fabricator</Text>
                        </Button>
                    </View>
                 </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    button1:{
        backgroundColor:"#ffffff",
        marginBottom:10 ,
    },
    button2:{
        backgroundColor:"#ffffff",
        marginBottom:10 
    },
    button3:{
        backgroundColor:"#ffffff",
        marginBottom:10 
    },
    text:{
        color:"#000000"
    },
    buttonsWrapper:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:20
    }
})
