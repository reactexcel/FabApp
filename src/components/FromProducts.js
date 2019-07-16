import React, { Component } from 'react'
import {  View,FlatList, StyleSheet } from 'react-native'
import item from "../constants/exhibition.json"
import {Radio, ListItem,Left, Text,Input,Item, Right} from "native-base";

export default class FromProducts extends Component {
    _renderItem=({item,index})=>{
        return(
            <View key={index} style={styles.item}>
                <View style={styles.listIem}> 
                    <View style={styles.radioButton}>
                        <Radio 
                             color={"#f0ad4e"}
                             selectedColor={"#5cb85c"}
                             selected={true}
                         />
                        <Text style={styles.radioButtonText}>Daily Stand Up</Text>
                    </View>
                    <View>
                        <Input 
                            style={styles.inputSize}
                            placeholder='Quantity...'
                            keyboardType={"phone-pad"}
                            placeholderTextColor="#E6E5E2"
                            maxLength={5}
                            onFocus={index > 6 ?  ()=>this.scrollView.scrollToEnd() : ()=> console.log()}
                        />
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.listWrapper}> 
                <View>
                    <Text></Text>
                </View>
                <FlatList
                    ref={(ref) => { this.scrollView = ref; }}
                    data={item}
                    renderItem={this._renderItem}
                    keyExtractor={(item,index)=>index.toString()}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}
const styles= StyleSheet.create({
    item:{
        // padding,
        marginBottom:20
    },
    listWrapper:{
        // paddingBottom:30,
        flex:1
    },
    listIem:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:20
    },
    radioButton:{
        flexDirection:"row"
    },
    radioButtonText:{
        marginLeft:5
    },
    inputSize:{
        borderWidth:1,
        borderColor:"#D7DBDD",
        borderRadius:4,
        padding:0,
        height:20,
        fontSize:15,
        color:"#000000",
    },
    horizontalLine:{
        borderBottomWidth:1,
       width:"95%",
       flexDirection:"row",
       alignSelf:"flex-end",
       borderBottomColor:"#D7DBDD",
       marginTop:5
    }
})
