import { View,Text } from "native-base";
import {StyleSheet} from "react-native"
import React from "react"

 const NoData =({message})=>{
    return(
        <View style={styles.view}>
            <Text style={styles.text}>
                {message}
            </Text>
        </View>
    )
}
export default NoData ;

const styles = StyleSheet.create({
    view:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:20
    }
})