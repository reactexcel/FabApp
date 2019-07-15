import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Layout from "../helper/Layout";
import {Icon} from "native-base";

export default class ExhibitorForm extends Component {
    constructor(props){
        super(props)
        this.state={scrollToIndex:0}
    }

    _renderItem=({item,index})=>{
        return(
        <View key={index} style={styles.contentCard}>
            <View>
                <Text>{index}sizepnemnrejfw k;ln',nbvjnkml;,</Text>
            </View>
        </View>
        )
    }

    scrollToIndex = (index,length) => {
        if( length > index){
        this.flatListRef.scrollToIndex({animated: true, index: index});
        }
        if( length-1 > index){
            this.setState({scrollToIndex:this.state.scrollToIndex+1})
        }
    }
    render() {
        const {scrollToIndex} = this.state;
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
                <TouchableOpacity onPress={()=>this.scrollToIndex(scrollToIndex+1,7)} activeOpacity={.7}>
                    <View style={styles.tapToContinueButtonView}>
                            <Text style={styles.continueText}>Continue</Text>
                            <Icon
                            type="AntDesign"
                            name="arrowright"
                            style={{color:"#ffffff"}}
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
        width:Layout.window.width
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
    }
})