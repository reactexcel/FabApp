import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SplashScreen from "react-native-splash-screen";
import Header from "../generic/Header";
import data from "../constants/exhibition.json";
import Portfolio from "../components/Portfolio";
import {Input} from "native-base";

export default class ChatRoom extends Component {
    static navigationOptions = {
        header: null
      };

    async componentDidMount() {
        SplashScreen.hide();
    }

    goBack=()=>{
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{flex:1}} >
                 <Header 
                    isLeft={true}
                    isCenter={true}
                    centerText={"Messages"}
                    leftIcon={"arrowleft"}
                    leftIconCategory={"AntDesign"}
                    isNotRightThenWidth={"70%"}
                    goBack={this.goBack}
                 />
                 <View style={{flex:1,flexDirection:"column"}}>
                    <Portfolio 
                        horizontal={false}
                        portfolioData={data }
                        from="chat"
                    />
                    <View style={{alignSelf:"flex-end",zIndex:100,position:"absolute",bottom:0}}>
                        <Input value="cvxcvxc"  placeholder="type..." />
                    </View>
                 </View>
            </View>
        )
    }
}
