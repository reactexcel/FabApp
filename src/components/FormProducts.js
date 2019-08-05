import React, { Component } from 'react'
import {  View,FlatList, StyleSheet } from 'react-native'
import {Radio, ListItem,Left, Text,Input,Item, Right} from "native-base";

export default class FormProducts extends Component {

    _renderItem=({item,index})=>{
        const {categoryIndex} = this.props;
        return(
            <View key={index} style={styles.item}>
                <View style={styles.listIem}> 
                    <View style={styles.radioButton}>
                        <Radio 
                            color={"#f0ad4e"}
                            selectedColor={"#5cb85c"}
                            selected={item.selected}
                            onPress={()=>this.props.onRadioButtonPress(index,categoryIndex,item, !item.selected)}
                        />
                        <Text style={styles.radioButtonText}>{categoryIndex == 3 ? item.branding : categoryIndex == 5 ? item.product : item.furniture }</Text>
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
                        <Text style={styles.errorText}>*add quantity</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
            </View>
        )
    }

    _fablist=({item,index})=>{
        return(
            <View key={index} style={styles.item}>
                <View style={styles.fablistIem}> 
                    <View style={styles.radioButton}>
                        <Radio 
                            color={"#f0ad4e"}
                            selectedColor={"#5cb85c"}
                            selected={item.selected}
                            onPress={()=>this.props.onRadioButtonPress(index,item, !item.selected)}
                        />
                    </View>
                    <View style={styles.fabDetailWrapper}>
                        <View style={styles.detailRaw}>
                            <Text>Name: </Text>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={styles.detailRaw}>
                            <Text>Email: </Text>
                            <Text>{item.email}</Text>
                        </View>
                        <View style={styles.detailRaw}>
                            <Text>Rating: </Text>
                            <Text>{item.avg_rating}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
            </View>
        )
    }

    render() {
        const {item,extraDataFormProduct,fablist } = this.props;
        return (
            <View style={styles.listWrapper}> 
                <FlatList
                    ref={(ref) => { this.scrollView = ref; }}
                    data={item}
                    extraData={extraDataFormProduct}
                    renderItem={fablist ? this._fablist : this._renderItem}
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
    fabDetailWrapper:{
        flexDirection:'column'
    },
    listWrapper:{
        // paddingBottom:30,
        flex:1
    },
    detailRaw:{
        flexDirection:"row",
        marginLeft:10
    },
    fablistIem:{
        flexDirection:"row",
        paddingHorizontal:20,
        alignItems:'center'
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
    },
    errorText:{
        fontSize:12,
        color:"red"
    }
})
