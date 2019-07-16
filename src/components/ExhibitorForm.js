import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import Layout from "../helper/Layout";
import {Icon} from "native-base";
import { Container, Header, Content, Item, Input, Radio } from 'native-base';
import FromProducts from './FromProducts';

export default class ExhibitorForm extends Component {
    constructor(props){
        super(props)
        this.state={scrollToIndex:0}
    }

    _renderItem=({item,index})=>{
        let cardText = index == 0 ? "Stall size" : index == 1 ? "Stall no" : "Color theme"
        return(
        <View key={index} style={styles.contentCard}>
            {(index ==0 || index ==1 || index ==2) &&
                    <View style={styles.inputView}>
                    <Text style={styles.stallText}>{cardText}</Text>
                    <Item >
                        <Input 
                            style={styles.inputSize}
                            placeholder='Type here..'
                            keyboardType={index !=2 ? "phone-pad" : "default"}
                        />
                    </Item>
                </View>}
               {index ==3 && <FromProducts index={index}/>}
        </View>
        )
    }
    render() {
        const {scrollToIndex} =this.props;
        return (
            <View style={styles.mainWrapper}>
                <FlatList 
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={[1,2,3,4,5,6,7]}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={this._renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />
                <View style={styles.horizontalLine}/>
                <TouchableOpacity onPress={()=>this.props.scrollToIndexHandler(scrollToIndex+1,7,this.flatListRef)} activeOpacity={.7}>
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
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper:{
        flex:1,
        backgroundColor:"#ffffff"
    },
    contentCard:{
        flex:1,
        width:"100%",
        width:Layout.window.width,
        borderWidth:1,
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
    inputView:{
        paddingHorizontal:10,
        flex:1,
        flexDirection:'column',
        justifyContent:"flex-start",
        alignItems:"center",
        marginTop:40
    },
    inputSize:{
        borderWidth:1,
        borderColor:"#D7DBDD",
        borderRadius:4
    },
    iconColor:{
        color:"#ffffff"
    },
    stallText:{
        fontSize:24,
        fontWeight:"bold",
        color:"#000000",
        marginBottom:40
    }
})