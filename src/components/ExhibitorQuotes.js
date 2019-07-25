import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Portfolio from "./Portfolio";

export default class ExhibitorQuotes extends Component {
    render() {
        return (
            <View style={{backgroundColor:"#ffffff",flex:1}}>
                <Portfolio horizontal={false}/>
            </View>
        )
    }
}
