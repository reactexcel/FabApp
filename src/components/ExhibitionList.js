import React, { Component } from 'react'
import { Text, View ,FlatList,Image,StyleSheet} from 'react-native'
import exhibitionList from "../constants/exhibition.json"
import Layout from "../helper/Layout";

export default class ExhibitionList extends Component {
    _renderItem=({item,index})=>{
        return(
            <View>
                <View style={styles.rowWrapper} key={index}>
                    <View style={styles.imageView}>
                        <Image style={styles.img} source={require('../../assets/images/confabricatordirectory.jpg')}/>
                    </View>
                    <View style={styles.exhibitionTextView}>
                        <Text style={styles.exhibitionText}>{item.exhibitionName}</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
            </View>
        )
    }
    _keyExtractor=(item,index)=>{return item}
    render() {
        return (
            <View style={styles.flatlistWrapper}>
                <FlatList
                data={exhibitionList && exhibitionList}
                renderItem={this._renderItem}
                // keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
   imageView:{
       width:60,
       height:60,
   },
   img:{
    width:"100%",
    height:"100%",
    borderRadius:5
   },
   flatlistWrapper:{
       paddingLeft:17,
       backgroundColor:"#ffffff"
   },
   rowWrapper:{
       flexDirection:"row",
       marginTop:10,
       alignItems:"center",
       justifyContent:'flex-start',
   },
   exhibitionTextView:{
       marginLeft:20
   },
   horizontalLine:{
       borderBottomWidth:1,
       width:"80%",
       flexDirection:"row",
       alignSelf:"flex-end",
       borderBottomColor:"#D7DBDD",
       marginTop:5
   },
   exhibitionText:{
       color:"#17202A",
       fontSize:15,
       fontWeight:"bold"
   }
})