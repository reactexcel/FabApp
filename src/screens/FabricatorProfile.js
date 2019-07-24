import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import Header from "../generic/Header";
import LinearGradient from "react-native-linear-gradient";
import StarRating from 'react-native-star-rating';
import FabricatorPortfolio from "../components/FabricatorPortfolio";

export default class FabricatorProfile extends Component {
    static navigationOptions = {
        header: null
      };

      goBack=()=>{
        this.props.navigation.goBack()
      }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    isLeft={true}
                    leftIcon={"arrowleft"}
                    isCenter={true}
                    leftIconCategory={"AntDesign"}
                    isRight={true}
                    rightIconCategoty={"Entypo"}
                    rightIcon={"pencil"}
                    centerText={"Profile"}
                    goBack={this.goBack}
                    onPressRight={()=>null}
                />
                <LinearGradient style={{flex:1}} colors={["#ffffff","#ffffff"]}>
                    {/* <ScrollView > */}
                            <View style={styles.profilePicView}>
                                <View style={styles.avatarView}>
                                    <Image resizeMode="cover" style={styles.img} source={require("../../assets/images/avatar.png")} />
                                </View>
                                <View>
                                    <Text style={styles.userNameText}>John doe</Text>
                                    <View style={styles.starRatingView}>
                                        <Text style={styles.ratingText} >Rating:</Text>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={2.4}
                                            selectedStar={()=>null}
                                            starSize={15}
                                            starStyle={{marginRight:2}}
                                        />
                                    </View>
                                </View>
                                
                            </View>
                        <View style={styles.userInfoContainer}>
                            <View style={styles.itemWrapper}>
                                <Text  style={styles.title}>Mobile No</Text>
                                <Text style={styles.item}>9012345678</Text>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <View style={styles.itemWrapper}>
                                <Text  style={styles.title}>About your self</Text>
                                <Text style={styles.item}>I am johndoe I am johndoe I am johndoe I am johndoe I am johndoe I am johndoe I am johndoeI am johndoe</Text>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <View style={styles.portfolioWrapper}>
                                <Text  style={styles.portfoliotitle}>Portfolio</Text>
                                <FabricatorPortfolio/>
                            </View>
                        </View>
                    {/* </ScrollView> */}
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#ffffff"
    },
    profilePicView:{
        paddingTop:30,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    avatarView:{
        width:110,
        height:110,
        marginBottom:5
    },
    img:{
        width:"100%",
        height:"100%",
        borderRadius:110/2
    },
    userNameText:{
        fontSize:20,
        alignSelf:"center"
    },
    userInfoContainer:{
        // paddingHorizontal:15
    },
    title:{
        fontSize:20,
        color:"#000000"
    },
    portfoliotitle:{
        fontSize:20,
        color:"#000000",
        marginLeft:20
    },
    item:{
        fontSize:17,
        color:"#4D4D4C",
    },
    itemWrapper:{
        marginTop:10,
        marginBottom:15,
        paddingHorizontal:20
    },
    portfolioWrapper:{
        marginTop:10,
        marginBottom:15,
    },
    horizontalLine:{
        borderBottomWidth:1,
       width:"95%",
       flexDirection:"row",
       alignSelf:"flex-end",
       borderBottomColor:"#D7DBDD",
       marginTop:5
    },
    starRatingView:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    },
    ratingText:{
        marginRight:6
    }
})