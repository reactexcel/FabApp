import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView,TouchableOpacity,TextInput, AsyncStorage } from 'react-native'
import Header from "../generic/Header";
import LinearGradient from "react-native-linear-gradient";
import StarRating from 'react-native-star-rating';
import Portfolio from "../components/Portfolio";
import Layout from '../helper/Layout';
import ImageZoom from 'react-native-image-pan-zoom';
import {Icon,Input,Item,Label,Textarea} from "native-base"
import SplashScreen from "react-native-splash-screen";
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import {setItem, getItem,removeItem} from "../helper/storage";
import ErrorLoader from "../generic/ErrorLoader";

 class FabricatorProfile extends Component {
    static navigationOptions = {
        header: null
      };
      constructor(props){
            super(props);
            this.state={zoomer:false,
                    profileEdit:false,
                    Mobilefocus:false,
                    aboutYourSelfFocus:false,
                    websiteFocus:false,
                    mobileNumber:"",
                    websiteLink:"",
                    aboutYourSelf:"",
                    userToken:undefined
                }
      }
    
   async componentDidMount(){
    const path =  this.props.navigation && this.props.navigation.state && this.props.navigation.state.params
        if(path && path.navigatedFromForm){
            const userToken = await getItem("userInfo")
            this.setState({userToken})
            this.props.userProfileRequest({userToken:userToken.token})
        }
    }

    componentDidUpdate(preProps){
        const {userProfile,updateProfile} = this.props;
        const {userToken} = this.state;
        if(userProfile.isSuccess !== preProps.userProfile.isSuccess){
            if(userProfile.data && userProfile.data.length){
                const userInfo = userProfile.data[0] 
                this.setState({name:userInfo.name,
                            aboutYourSelf:userInfo.bio,
                            mobileNumber:userInfo.phone.replace("+91",""),
                        websiteLink:userInfo.website_link})
            }
        }
        if(updateProfile.isSuccess !== preProps.updateProfile.isSuccess){
            if(updateProfile.data){
                  this.props.userProfileRequest({userToken:userToken.token})
            }
        }
    }

    goBack=()=>{
         this.props.navigation.goBack()
    }

    onPortfolioImagePress=()=>{
        this.setState({zoomer:!this.state.zoomer})
    }

    onProfileEdit=()=>{
        const {profileEdit} = this.state;
        const {userProfile} = this.props;
        const userInfo = userProfile.data[0] 
        if(!profileEdit){
            this.refs.websiteLink._root.focus()
            this.setState({profileEdit:!this.state.profileEdit,})
        }
        else{
            this.setState({profileEdit:!this.state.profileEdit,Mobilefocus:false,aboutYourSelfFocus:false,
                name:userInfo.name,
                aboutYourSelf:userInfo.bio,
                mobileNumber:userInfo.phone.replace("+91",""),
                websiteLink:userInfo.website_link,profileEdit:!this.state.profileEdit})
        }
    }

    onFieldSubmitting=(field)=>{
        if(field === "aboutYourSelf"){
            this.setState({Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
            this.refs.aboutYourSelf._root.focus()
        }
        else if(field === "mobileno"){
            this.setState({Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
            this.refs.mobileNumber._root.focus()
        }
        else{
            this.setState({Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
        }
    }

    logout=async()=>{
       await removeItem("userInfo")
        this.props.navigation.navigate("Exebition")
    }

    updateProfile=()=>{
        const {mobileNumber, aboutYourSelf,userToken} = this.state;
        const userInfo = this.props.userProfile.data[0] 
        this.props.updateProfileRequest(
                                    {userToken:userToken.token,
                                    id:userInfo.id,
                                    data:{bio:aboutYourSelf,phone: `+91${mobileNumber}`,  }}
                                    )
    }


    render() {
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        const {exhitorProfile,userProfile} =this.props;
        const {zoomer,profileEdit,mobileNumber,websiteLink,name,aboutYourSelf,Mobilefocus,aboutYourSelfFocus,websiteFocus}= this.state
       const userInfo = userProfile.data && userProfile.data.length && userProfile.data[0]     
        return (
            <View style={styles.container}>
                {!exhitorProfile &&
                 <Header
                    isLeft={true}
                    // leftIcon={"arrowleft"}
                    isCenter={true}
                    leftIconCategory={ "AntDesign"}
                    isRight={true}
                    rightIconCategoty={"MaterialCommunityIcons"}
                    rightIcon={profileEdit  ? "pencil-off" :  "pencil"}
                    centerText={"Profile"}
                    goBack={this.goBack}
                    onPressRight={this.onProfileEdit}
                />}
               
                
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
                    {userProfile.isSuccess ?  <ScrollView >
                            <View style={styles.profilePicView}>
                                <View style={styles.avatarView}>
                                    <Image resizeMode="cover" style={styles.img} source={require("../../assets/images/avatar.png")} />
                                </View>
                                <View>
                                    <Text style={styles.userNameText}>{name}</Text>
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
                                    <Label style={styles.title}>Website Link</Label>
                                    <Input 
                                        ref="websiteLink"
                                        style={[styles.item,{padding:0,height:20,}]}
                                        placeholder={'Your mobile no...'}      
                                        placeholderTextColor="#E6E5E2"
                                        // maxLength={10}
                                        value={websiteLink}
                                        editable={profileEdit}
                                        onFocus={()=>{this.setState({websiteFocus:true, Mobilefocus:false,aboutYourSelfFocus:false})}}
                                        onSubmitEditing={(e)=>this.onFieldSubmitting("mobileno")}
                                        onBlur={(e)=>this.onFieldSubmitting("")}
                                        onChangeText={(websiteLink)=>this.setState({websiteLink})}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.horizontalLine,{borderBottomColor:websiteFocus ? "#000000" : "#D7DBDD",borderBottomWidth:websiteFocus ? 2 : 1}]}/>
                            {/* <Text style={styles.error}>*required field</Text> */}
                            
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
                                        onFocus={()=>{this.setState({websiteFocus:false,Mobilefocus:true,aboutYourSelfFocus:false})}}
                                        onSubmitEditing={(e)=>this.onFieldSubmitting("aboutYourSelf")}
                                        onBlur={(e)=>this.onFieldSubmitting("")}
                                        onChangeText={(mobileNumber)=>this.setState({mobileNumber})}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.horizontalLine,{borderBottomColor:Mobilefocus ? "#000000" : "#D7DBDD",borderBottomWidth:Mobilefocus ? 2 : 1}]}/>
                            {/* <Text style={styles.error}>*required field</Text> */}
                           
                            
                            <View style={styles.itemWrapper}>
                                <Item style={[styles.fromItem,{borderColor:"transparent"}]} stackedLabel>
                                <Label style={styles.title}>{exhitorProfile ? "Address" : "About your self"}</Label>
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
                                            onFocus={()=>{this.setState({websiteFocus:false, Mobilefocus:false,aboutYourSelfFocus:true})}}
                                            onBlur={(e)=>this.onFieldSubmitting("")}
                                            onChangeText={(aboutYourSelf)=>this.setState({aboutYourSelf})}
                                        /> 
                                    }
                            </Item>
                            </View>
                            
                            <View style={[styles.horizontalLine,{borderBottomColor:aboutYourSelfFocus ? "#000000" : "#D7DBDD",borderBottomWidth:aboutYourSelfFocus ? 2 : 1}]}/>
                            {/* <Text style={styles.error}>*required field</Text> */}
                            {(!exhitorProfile && userProfile.data.length && userProfile.data[0].role === "fabricator") &&
                            <>
                            <View style={styles.portfolioWrapper}>
                                <View style={styles.plusIconView}>
                                    <Text  style={styles.portfoliotitle}>Portfolio</Text>
                                    <Icon
                                        type={"AntDesign"}
                                        name={"plus"}
                                        style={styles.plusIcon}
                                    />
                                </View>
                                {(userProfile.data.length > 1 && userProfile.data[2].Portfolio.length ) ?
                                    <Portfolio 
                                        onPortfolioImagePress ={this.onPortfolioImagePress}
                                        horizontal={true}
                                        portfolioData={userProfile.data[2].Portfolio}
                                    /> :
                                    <View style={styles.noPortfolioView}>
                                        <Text style={styles.noPortfolioText} >
                                           There is no portfolio content to show at the time, add now.
                                        </Text>
                                    </View>
                                 }
                            </View>
                            </> 
                            }
                            <TouchableOpacity onPress={this.logout}>
                            <Text >Logout</Text>

                            </TouchableOpacity>
                        </View>
                    </ScrollView>  : <ErrorLoader handlerData={userProfile} />}
                </LinearGradient>
                {(profileEdit && userInfo && (userInfo.name !== name || userInfo.website_link !== websiteLink || userInfo.phone.replace("+91","") !== mobileNumber) ) &&
                <TouchableOpacity onPress={this.updateProfile} activeOpacity={.7}>
                        <View style={styles.tapToContinueButtonView}>
                            <Text style={styles.continueText}>Update</Text>
                        </View>
                 </TouchableOpacity>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfile:state.user.userProfile,
        updateProfile:state.user.updateProfile,
    }
  }
  
  const mapDispatchToProps = dispatch => 
      bindActionCreators(actions, dispatch);
  
  export default connect(mapStateToProps,mapDispatchToProps)(FabricatorProfile)

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
        marginTop:40,
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
        width:"100%"
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
    },
    noPortfolioView:{
        paddingHorizontal:20,
        marginTop:20
    },
    noPortfolioText:{
        fontSize:15,
        textAlign: 'center',
    },
    tapToContinueButtonView:{
        marginTop:5,
        marginHorizontal:10,
        backgroundColor:"#000000",
        padding:15,
        flexDirection:'row',
        justifyContent:"center",
        borderRadius:4,
        alignItems:'center'
    },
    continueText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"800",
        marginRight:10
    },
    iconColor:{
        color:"#ffffff"
    }
})