import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity,ScrollView, BackHandler,Animated } from 'react-native'
import Layout from "../helper/Layout";
import { Container, Header, Content, Item, Input, Radio,Label,Icon,Textarea } from 'native-base';


export default class FabricatorForm extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    onTextChange =(value, name)=>{
        this.props.onChangeText(value, name);
    }
    render() {
        const {exhibitorForm,exhibitorDetail} = this.props;
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
                                    value={exhibitorDetail.name}
                                    style={styles.inputSize}
                                    placeholder={"Your name..."}      
                                    placeholderTextColor="#E6E5E2"
                                    onChangeText={(value)=>this.onTextChange(value, "name")}
                                />
                            </Item>
                            <Item style={styles.fromItem} stackedLabel>
                                <Label>Mobile No</Label>
                                <Input 
                                    value={exhibitorDetail.mobileNo}
                                    style={styles.inputSize}
                                    placeholder={'Your mobile no...'}      
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#E6E5E2"
                                    maxLength={10}
                                    onChangeText={(value)=>this.onTextChange(value, "mobileNo")}
                                />
                            </Item>
                            <Item style={styles.fromItem} stackedLabel>
                                <Label>Email id</Label>
                                <Input 
                                    value={exhibitorDetail.email}
                                    style={styles.inputSize}
                                    placeholder={'Your email-id...'}      
                                    placeholderTextColor="#E6E5E2"
                                    onChangeText={(value)=>this.onTextChange(value, "email")}
                                />
                            </Item>
                            <Item style={[styles.fromItem,{borderColor:"transparent"}]} stackedLabel>
                                <Label>About your self</Label>
                                <Textarea 
                                    value={exhibitorDetail.aboutYourSelf}
                                    numberOfLines={8}
                                    style={styles.inputTextAreaSize}
                                    placeholder={'Berief yourself...'}      
                                    placeholderTextColor="#E6E5E2"
                                    onChangeText={(value)=>this.onTextChange(value, "aboutYourSelf")}
                                />
                            </Item>
                        </View>
                       {!exhibitorForm && 
                         <View>
                            <View style={styles.horizontalLine}/>
                            <TouchableOpacity onPress={()=>this.props.goToFabricatorProfile()} activeOpacity={.7}>
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
                        }
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
        borderWidth:1,
        marginTop:15

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