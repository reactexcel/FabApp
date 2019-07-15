import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar, } from 'react-native'
import {Icon} from "native-base";

export default class Headerr extends Component {

    render() {
        const { isCenter,isLeft,isRight,rightText,centerText,leftText,leftIcon,centerIcon,rightIcon,isNotRightThenWidth} =this.props;
        return (
            <View style={styles.wrapper}>
                <StatusBar backgroundColor="#000000" barStyle="light-content" />
                <View  style={[styles.perentView,{width:isRight ? '100%' : isNotRightThenWidth}]}> 
                    {isLeft &&
                         <View>
                            <Icon
                                onPress={()=>this.props.goBack()}
                                type="AntDesign"
                                name={leftIcon}
                                style={{color:"#ffffff"}}
                            />
                    </View>}
                    {isCenter && <View>
                        <Text style={{color:"#ffffff",fontSize:20,fontWeight:"bold"}}>{centerText}</Text>
                    </View>}
                    {isRight && 
                    <View>
                        <Text style={{color:"#ffffff",fontSize:20,fontWeight:"bold"}}>RIGHT</Text>
                    </View>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:"#000000",
    },
    perentView:{
        flexDirection:"row",
        height:60,
        backgroundColor:"transparent",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:17

    }
})