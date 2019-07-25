import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView,TouchableOpacity,TextInput } from 'react-native'
import Header from "../generic/Header";
import LinearGradient from "react-native-linear-gradient";
import StarRating from 'react-native-star-rating';
import FabricatorPortfolio from "../components/FabricatorPortfolio";
import Layout from '../helper/Layout';
import ImageZoom from 'react-native-image-pan-zoom';
import {Icon,Input,Item,Label,Textarea} from "native-base"
import SplashScreen from "react-native-splash-screen";

export default class FabricatorProfile extends Component {
    static navigationOptions = {
        header: null
      };
      constructor(props){
            super(props);
            this.state={zoomer:false,
                    profileEdit:false,
                    Mobilefocus:false,
                    aboutYourSelfFocus:false,
                    mobileNumber:"9012345678",
                    aboutYourSelf:"I am johndoe man i can do everything!  am johndoe man i can do everything!  am johndoe man i can do everything!  am johndoe man i can do everything!  am johndoe man i can do everything! am johndoe man i can do everything!"
                }
      }
    
    componentDidMount(){
        SplashScreen.hide();
    }

    goBack=()=>{
         this.props.navigation.goBack()
    }

    onPortfolioImagePress=()=>{
        this.setState({zoomer:!this.state.zoomer})
    }

    onProfileEdit=()=>{
        const {profileEdit} = this.state;
        if(!profileEdit){
            this.refs.mobileNumber._root.focus()
            this.setState({profileEdit:!this.state.profileEdit})
        }
        else{
            this.setState({profileEdit:!this.state.profileEdit,Mobilefocus:false,aboutYourSelfFocus:false})
        }
    }

    onFieldSubmitting=(field)=>{
        if(field === "aboutYourSelf"){
            this.setState({Mobilefocus:false,aboutYourSelfFocus:false})
        }
        else{
            this.setState({Mobilefocus:false,aboutYourSelfFocus:false})
            this.refs.aboutYourSelf._root.focus()
        }
    }
    render() {
        const {zoomer,profileEdit,mobileNumber,aboutYourSelf,Mobilefocus,aboutYourSelfFocus}= this.state
        return (
            <View style={styles.container}>
                <Header
                    isLeft={true}
                    leftIcon={"arrowleft"}
                    isCenter={true}
                    leftIconCategory={ "AntDesign"}
                    isRight={true}
                    rightIconCategoty={"MaterialCommunityIcons"}
                    rightIcon={profileEdit ? "pencil-off" : "pencil"}
                    centerText={"Profile"}
                    goBack={this.goBack}
                    onPressRight={this.onProfileEdit}
                />
                <LinearGradient style={{flex:1}} colors={["#ffffff","#ffffff"]}>
                   {zoomer &&
                     <View style={styles.imageZoomerOverlay}>
                        <View style={{position:'absolute',right:15,zIndex:10000,top:15}}>
                            <TouchableOpacity activeOpacity={.7} onPress={this.onPortfolioImagePress}>
                                    <Icon
                                        type={"EvilIcons"}
                                        name={"close"}
                                        style={styles.icon}
                                    />
                            </TouchableOpacity>
                        </View>
                        <ImageZoom
                            cropWidth={Layout.window.width}
                            cropHeight={Layout.window.height}
                            imageWidth={Layout.window.width}
                            imageHeight={Layout.window.width}>
                                <Image resizeMode="cover" style={{width:Layout.window.width, height:Layout.window.width}} source={require("../../assets/images/avatar.png")}/>
                        </ImageZoom>
                    </View>}
                    <ScrollView >
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
                                <Item style={{borderColor:"transparent"}} stackedLabel>
                                    <Label style={styles.title}>Mobile No</Label>
                                    <Input 
                                        ref="mobileNumber"
                                        style={[styles.item,{padding:0,height:20,}]}
                                        placeholder={'Your mobile no...'}      
                                        keyboardType="phone-pad"
                                        placeholderTextColor="#E6E5E2"
                                        maxLength={10}
                                        value={mobileNumber}
                                        editable={profileEdit}
                                        onFocus={()=>{this.setState({Mobilefocus:true,aboutYourSelfFocus:false})}}
                                        onSubmitEditing={(e)=>this.onFieldSubmitting("")}
                                        onBlur={(e)=>this.onFieldSubmitting("aboutYourSelf")}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.horizontalLine,{borderBottomColor:Mobilefocus ? "#000000" : "#D7DBDD",borderBottomWidth:Mobilefocus ? 2 : 1}]}/>
                            <Text style={styles.error}>*required field</Text>
                            <View style={styles.itemWrapper}>
                                <Item style={[styles.fromItem,{borderColor:"transparent"}]} stackedLabel>
                                <Label style={styles.title}>About your self</Label>
                                    {!profileEdit ? 
                                     <Text style={[styles.item,{width:"100%",paddingLeft:5,marginBottom:8}]} >{aboutYourSelf}</Text> : 
                                        <Textarea 
                                            ref="aboutYourSelf"
                                            numberOfLines={20}
                                            value= {aboutYourSelf}
                                            style={[styles.inputTextAreaSize,{marginTop:profileEdit ? 15 : -10,borderWidth:profileEdit ? 1 : 0,}]}
                                            placeholder={'About yourself...'}      
                                            placeholderTextColor="#E6E5E2"
                                            disabled={!profileEdit}
                                            onFocus={()=>{this.setState({Mobilefocus:false,aboutYourSelfFocus:true})}}
                                            onBlur={(e)=>this.onFieldSubmitting("aboutYourSelf")}
                                        /> 
                                    }
                            </Item>
                            </View>
                            <View style={[styles.horizontalLine,{borderBottomColor:aboutYourSelfFocus ? "#000000" : "#D7DBDD",borderBottomWidth:aboutYourSelfFocus ? 2 : 1}]}/>
                            <Text style={styles.error}>*required field</Text>
                            <View style={styles.portfolioWrapper}>
                                <View style={styles.plusIconView}>
                                    <Text  style={styles.portfoliotitle}>Portfolio</Text>
                                    <Icon
                                        type={"AntDesign"}
                                        name={"plus"}
                                        style={styles.plusIcon}
                                    />
                                </View>
                                <FabricatorPortfolio 
                                    onPortfolioImagePress ={this.onPortfolioImagePress}
                                 />
                            </View>
                        </View>
                    </ScrollView>
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
        paddingHorizontal:20
    },
    portfolioWrapper:{
        marginTop:20,
        marginBottom:15,
    },
    horizontalLine:{
       width:"95%",
       flexDirection:"row",
       alignSelf:"flex-end",
    },
    starRatingView:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    },
    ratingText:{
        marginRight:6
    },
    imageZoomerOverlay:{
        flex:1,
        position:"absolute",
        width:"100%",
        height:Layout.window.height,
        backgroundColor:"rgba(0,0,0,.8)",
        zIndex:10
    },
    icon:{
        color:"#ffffff",
        fontSize:35
    },
    plusIcon:{
        color:"#000000",
        fontSize:27
    },
    plusIconView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        paddingRight:20
    },
    inputTextAreaSize:{
        borderColor:"#D7DBDD",
        borderRadius:4,
        width:"100%",
        height:100,
        marginBottom:10,
        fontSize:17,
        color:"#4D4D4C"
    },
    error:{
        color:"red",
        marginLeft:20
    }
})