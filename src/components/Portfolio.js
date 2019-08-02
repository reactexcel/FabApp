import React, { Component } from 'react'
import { Text, View, VirtualizedList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {Icon} from "native-base";
const portfolio =[{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"}]

export default class Portfolio extends Component {

    _renderItem=({item, index})=>{
        let list = item[index]
        const {isApiData} =this.props;
        return(
            <View>
                <View style={[styles.portfolioView,{marginLeft:index ==0 ? 10 : 0, marginRight:index == portfolio.length-1 ? 40 : 10 }]}>
                    <TouchableOpacity onLongPress={()=>this.props.removeOrDelete(list.id,"longPress",index)} activeOpacity={.7} onPress={()=>this.onPortfolioImagePress(isApiData ? list.image.replace("image/upload/","") : list.image)}>
                            {list.selected && <View style={styles.deletingOverlay}/>}
                           {list.newId && <View style={styles.removePortFolio}>
                                <Icon
                                    onPress={()=>this.props.removeOrDelete(list.newId,"normal",index)}
                                    type={"AntDesign"}
                                    name={"closecircleo"}
                                    // style={styles.plusIcon}
                                />
                            </View>}
                             <Image resizeMode="cover" style={styles.img} source={{uri:isApiData ? list.image.replace("image/upload/","") : list.image}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _exhibitorQuotes=({item,index})=>{
        let list  = item[index]
        return(
            <View style={styles.cardWrapper}>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Size no: </Text>
                        <Text style={styles.product}>{list.size}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Brandings: </Text>
                        <Text style={styles.product}>{list.brandings.map((brand,i)=>{return `${brand.branding}(${brand.quantity}), ` })}</Text>
                    </View>
                </View>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Stall no: </Text>
                        <Text style={styles.product}>{list.stall_no}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Furnitures: </Text>
                        <Text style={styles.product}>{list.furnitures.map((brand,i)=>{return `${brand.furniture}(${brand.quantity}), ` })}</Text>
                    </View>
                </View>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Color theme: </Text>
                        <Text style={styles.product}>{list.color_theme}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Carpet: </Text>
                        <Text style={styles.product}>{list.carpet}</Text>
                    </View>
                </View>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Product/Services: </Text>
                        <Text style={styles.product}>{list.products.map((brand,i)=>{return `${brand.product}(${brand.quantity}), ` })}</Text>
                    </View>
                    {/* <View style={styles.item}>
                        <Text style={styles.title}>Contact No: </Text>
                        <Text style={styles.product}>9012345678</Text>
                    </View> */}
                </View>
                <View style={styles.contactView}>
                    <View style={styles.contactno}>
                        <Text style={styles.title}>Website link: </Text>
                        <Text style={styles.product}>{list.website_link}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _getItemCount=(data)=>{
        return data.length
    }

    _getItemLayout=(data, index) => {
        return data
    }

    onPortfolioImagePress=(uri)=>{
        this.props.onPortfolioImagePress(uri)
    }

    render() {
        const {horizontal,portfolioData,fabExtraData} = this.props;
        return (
            <View style={styles.portfolioWrapper}>
                <VirtualizedList
                   style={{paddingVertical:12}}
                    data={portfolioData ? portfolioData : []}
                    renderItem={!horizontal ? this._exhibitorQuotes : this._renderItem}
                    keyExtractor={(item,index)=>index.toString()}
                    initialNumToRender={20}
                    getItem={this._getItemLayout}
                    windowSize={21}
                    maxToRenderPerBatch={20}
                    horizontal={!horizontal ? false : true }
                    getItemCount={this._getItemCount}
                    onEndReached={()=>{console.log("onEndReached")}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    extraData={fabExtraData}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    portfolioView:{
        width:160,
        height:160,
        paddingTop:10
    },
    img:{
        width:"100%",
        height:"100%",
        borderRadius:7,
    },
    portfolioWrapper:{
        paddingTop:4
    },
    infoList:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    item:{
        flexDirection:'row',
        flexWrap:"wrap",
        alignSelf:"baseline",
        flex:1,
        flexShrink:1
    },
    contactView:{
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:"center"
    },
    contactno:{
        flexDirection:"row"
    },
    cardWrapper:{
        borderWidth:1,
        marginHorizontal:10,
        paddingHorizontal:5,
        borderRadius:5,
        paddingVertical:5,
        borderColor:"rgba(0,0,0,.4)",
        marginBottom:15
    },
    title:{
        fontSize:15,
        color:"#000000",
        marginBottom:2
    },
    product:{
        fontSize:15,
        color:"rgba(0,0,0,.7)"
    },
    deletingOverlay:{
        width:"100%",
        height:"100%",
        alignSelf:"center",
        backgroundColor:"rgba(255,255,255,.5)",
        borderRadius:7,
        borderWidth:2,
        zIndex:100,
        position:'absolute',
        borderColor:"#263D4B"
    },
    removePortFolio:{
        zIndex:1000,
        position:'absolute',
        right:-10,
        top:-10,
    }
})