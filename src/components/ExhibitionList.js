import React, { Component } from 'react'
import { Text, View ,FlatList,Image,StyleSheet,TouchableOpacity} from 'react-native'
import exhibitionList from "../constants/exhibition.json"
import Layout from "../helper/Layout";

export default class ExhibitionList extends Component {
    _renderItem=({item,index})=>{
        return(
            <View key={index}>
                <TouchableOpacity  activeOpacity={.5} underlayColor="red" onPress={()=>this.props.toForm(item.id)}>
                    
                        <View style={styles.rowWrapper} key={index}>
                            <View style={styles.imageView}>
                                <Image style={styles.img} source={{uri:item.exhibition_image.replace("image/upload/","")}}/>
                            </View>
                            <View style={styles.exhibitionTextView}>
                                <Text style={styles.exhibitionText}>{item.exhibition_name}</Text>
                            </View>
                        </View>
                        <View style={styles.horizontalLine}></View>
                </TouchableOpacity>
            </View>

        )
    }

    render() {
        const {alleEhibitionList} = this.props;
        return (
            <View style={styles.flatlistWrapper}>
                <FlatList
                data={ alleEhibitionList.isSuccess && alleEhibitionList.exhibitions && alleEhibitionList.exhibitions}
                renderItem={this._renderItem}
                keyExtractor={(item,index)=>{index.toString()}}
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
       marginLeft:20,
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