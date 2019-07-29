import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native'

export default class ErrorLoader extends Component {
    render() {
        const {handlerData} = this.props;
        return (
            <View style={styles.errorHeaderContainer}>
                {handlerData.isError &&
                    <>
                        <View style={styles.errorImageView}>
                            <Image style={styles.errorImage} resizeMode="contain" source={require("../../assets/images/images.png")} />
                        </View>
                        <Text style={styles.errorText} >Oops! Network Error please try again.</Text>
                    </>
                }
                {(handlerData.isSuccess && handlerData.exhibitions && !handlerData.exhibitions.length >0) && 
                    <Text style={styles.errorText}>Oops! No exhibition available at this time.</Text>
                }

               { handlerData.isLoading &&
                 <ActivityIndicator size="large" color="#000000" />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    errorHeaderContainer:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    errorImageView:{
        width:100,
        height:100
    },
    errorImage:{
        width:"100%",
        height:"100%"
    },
    errorText:{
        fontSize:20,
        color:"#000000"
    }
})