import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar, } from 'react-native'
import {Icon} from "native-base";

export default class Headerr extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar backgroundColor="#000000" barStyle="light-content" />
                <View  style={styles.perentView}> 
                    {/* <View>
                        <Icon
                        type="AntDesign"
                        name="arrowleft"
                        style={{color:"#ffffff"}}
                        />
                    </View> */}
                    <View>
                        <Text style={{color:"#ffffff",fontSize:20,fontWeight:"bold"}}>Form</Text>
                    </View>
                    {/* <View>
                        <Text style={{color:"#ffffff"}}>RIGHT</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:"#000000",
    },
    perentView:{
        flexDirection:"row",
        height:60,
        width:"100%",
        backgroundColor:"transparent",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:17

    }
})