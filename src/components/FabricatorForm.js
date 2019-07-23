import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity,ScrollView, BackHandler,Animated } from 'react-native'
import Layout from "../helper/Layout";
import { Container, Header, Content, Item, Input, Radio,Label,Icon,Textarea } from 'native-base';
import FromProducts from './FromProducts';


export default class FabricatorForm extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    render() {
        return (
            <View style={styles.mainWrapper}>
                <ScrollView>
                    <View style={styles.contentWrapper}>
                        <View style={styles.formWrapper}>
                            <View style={styles.headerTextView}>
                                <Text style={styles.headerText}>Tell us about you</Text>
                            </View>
                            <Item style={styles.fromItem} stackedLabel>
                                <Label>Name</Label>
                                <Input 
                                    style={styles.inputSize}
                                    placeholder={"Your name..."}      
                                    placeholderTextColor="#E6E5E2"
                                />
                            </Item>
                            <Item style={styles.fromItem} stackedLabel>
                                <Label>Mobile No</Label>
                                <Input 
                                    style={styles.inputSize}
                                    placeholder={'Your mobile no...'}      
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#E6E5E2"
                                    maxLength={10}
                                />
                            </Item>
                            <Item style={styles.fromItem} stackedLabel>
                                <Label>Email id</Label>
                                <Input 
                                    style={styles.inputSize}
                                    placeholder={'Your email-id...'}      
                                    placeholderTextColor="#E6E5E2"
                                />
                            </Item>
                            <Item style={[styles.fromItem,{borderColor:"transparent"}]} stackedLabel>
                                <Label>Bio</Label>
                                <Textarea 
                                    numberOfLines={8}
                                    style={styles.inputTextAreaSize}
                                    placeholder={'Berief yourself...'}      
                                    placeholderTextColor="#E6E5E2"
                                />
                            </Item>
                        </View>
                        <View>
                            <View style={styles.horizontalLine}/>
                            <TouchableOpacity onPress={()=>this.props.goTo()} activeOpacity={.7}>
                                <View style={styles.tapToContinueButtonView}>
                                    <Text style={styles.continueText}>Continue</Text>
                                    <Icon
                                        type="AntDesign"
                                        name="arrowright"
                                        style={styles.iconColor}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
             </View>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    tapToContinueButtonView:{
        marginTop:5,
        marginHorizontal:10,
        backgroundColor:"#000000",
        padding:15,
        flexDirection:'row',
        justifyContent:"flex-end",
        borderRadius:4,
        alignItems:'center'
    },
    continueText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"800",
        marginRight:10
    },
    horizontalLine:{
        width:"100%",
        borderTopWidth:1,
        borderTopColor:"#D7DBDD"
    },
    inputSize:{
        borderColor:"#D7DBDD",
        borderRadius:4,
    },
    inputTextAreaSize:{
        borderColor:"#D7DBDD",
        borderRadius:4,
        width:"100%",
        height:100,
        borderWidth:1

    },
    formWrapper:{
        paddingHorizontal:20,
    },
    iconColor:{
        color:"#ffffff"
    },
    headerTextView:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center"
    },
    headerText:{
        fontSize:20,
        color:"#000000",
        fontWeight:"bold",
        marginTop:40,
        marginBottom:40
    },
    contentWrapper:{
        height:Layout.window.height-(Layout.window.height * .20),
        flexDirection:"column",
        justifyContent:"space-between"
    },
    fromItem:{
        marginTop:10
    }
})