import React, { Component } from 'react'
import { Text, View, VirtualizedList, StyleSheet, Image, TouchableOpacity } from 'react-native'

const portfolio =[{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"}]

export default class Portfolio extends Component {

    _renderItem=({item, index})=>{
        return(
            <View>
                <View style={[styles.portfolioView,{marginRight:index == portfolio.length-1 ? 40 : 10 }]}>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onPortfolioImagePress}>
                         <Image resizeMode="cover" style={styles.img} source={require("../../assets/images/avatar.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _exhibitorQuotes=()=>{
        return(
            <View style={styles.cardWrapper}>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Size no: </Text>
                        <Text style={styles.product}>12</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Branding: </Text>
                        <Text style={styles.product}>Samsung </Text>
                    </View>
                </View>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Stall no: </Text>
                        <Text style={styles.product}>12</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Furniture: </Text>
                        <Text style={styles.product}>Sofa, Bed, Chair </Text>
                    </View>
                </View>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Color theme: </Text>
                        <Text style={styles.product}>red</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Carpet: </Text>
                        <Text style={styles.product}>green, red </Text>
                    </View>
                </View>
                <View style={styles.infoList}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Product/Services: </Text>
                        <Text style={styles.product}>lorem ipsum</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Contact No: </Text>
                        <Text style={styles.product}>9012345678</Text>
                    </View>
                </View>
                <View style={styles.contactView}>
                    <View style={styles.contactno}>
                        <Text style={styles.title}>Website link: </Text>
                        <Text style={styles.product}>www.google.com</Text>
                    </View>
                </View>
            </View>
        )
    }

    _getItemCount=(data)=>{
        return 4
    }

    _getItemLayout=(data, index) => {
        return data
    }

    onPortfolioImagePress=()=>{
        this.props.onPortfolioImagePress()
    }

    render() {
        const {horizontal} = this.props;
        return (
            <View style={styles.portfolioWrapper}>
                <VirtualizedList
                   style={{paddingVertical:12}}
                    data={portfolio}
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
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    portfolioView:{
        width:160,
        height:160,
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
    }
})