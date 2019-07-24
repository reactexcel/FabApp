import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar, } from 'react-native'
import {Icon} from "native-base";

export default class Headerr extends Component {

    render() {
        const { isCenter,isLeft,isRight,rightText,centerText,leftText,leftIconCategory,leftIcon,centerIcon,rightIcon,isNotRightThenWidth,rightIconCategoty} =this.props;
        return (
            <View style={styles.wrapper}>
                <StatusBar backgroundColor="#000000" barStyle="light-content" />
                <View  style={[styles.perentView,{width:isRight ? '100%' : isNotRightThenWidth}]}> 
                    {isLeft &&
                         <View>
                             {leftText ?
                              <Text>{leftText}</Text> : 
                                <Icon
                                    onPress={()=>this.props.goBack()}
                                    type= {leftIconCategory}
                                    name={leftIcon}
                                    style={{color:"#ffffff"}}
                                />
                            }
                        </View>
                    }
                    {isCenter && 
                        <View>
                            <Text style={{color:"#ffffff",fontSize:20,fontWeight:"bold"}}>{centerText}</Text>
                        </View>
                    }
                    {isRight && 
                        <View>
                            {rightText ? 
                                <Text style={{color:"#ffffff",fontSize:20,fontWeight:"bold"}}>{rightText}</Text>: 
                                <Icon
                                    onPress={()=>this.props.onPressRight()}
                                    type={rightIconCategoty}
                                    name={rightIcon}
                                    style={{color:"#ffffff"}}
                                />
                            }
                        </View>
                    }
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