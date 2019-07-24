import React, { Component } from 'react'
import { Text, View, VirtualizedList, StyleSheet, Image, TouchableOpacity } from 'react-native'

const portfolio =[{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"},{A:'A',B:"B"}]

export default class FabricatorPortfolio extends Component {

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

    _getItemCount=(data)=>{
        return data.length
    }

    _getItemLayout=(data, index) => {
        return data
    }

    onPortfolioImagePress=()=>{
        this.props.onPortfolioImagePress()
    }

    render() {
        return (
            <View style={styles.portfolioWrapper}>
                <VirtualizedList
                   style={{paddingHorizontal:20}}
                    data={portfolio}
                    renderItem={this._renderItem}
                    keyExtractor={(item,index)=>index.toString()}
                    initialNumToRender={20}
                    getItem={this._getItemLayout}
                    windowSize={21}
                    maxToRenderPerBatch={20}
                    horizontal={true}
                    getItemCount={this._getItemCount}
                    onEndReached={()=>{console.log("onEndReached")}}
                    showsHorizontalScrollIndicator={false}
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
        marginTop:12
    }
})