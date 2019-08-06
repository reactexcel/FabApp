import React, { Component } from 'react'
import { Text, View, StyleSheet,ToastAndroid, Platform,Alert, Image,StatusBar, ScrollView,TouchableOpacity,TextInput, ActivityIndicator } from 'react-native'
import Header from "../generic/Header";
import LinearGradient from "react-native-linear-gradient";
import StarRating from 'react-native-star-rating';
import Portfolio from "../components/Portfolio";
import Layout from '../helper/Layout';
import ImageZoom from 'react-native-image-pan-zoom';
import {Icon,Input,Item,Label,Textarea} from "native-base"
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import {setItem, getItem,removeItem} from "../helper/storage";
import ErrorLoader from "../generic/ErrorLoader";
import validate from "../helper/validation";
import Permissions from "react-native-permissions";
import  DocumentPicker from "react-native-document-picker";
import  DocumentPickerUtil from "react-native-document-picker"
import RNFetchBlob from "rn-fetch-blob";
import alert from "../helper/alert";

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
                    userToken:undefined,
                    errors:{},
                    navigatedFromForm:false,
                    facricatorPortFolio:[],
                    zoomUri:'',
                    base64Data:[],
                    fabExtraData:[],
                    imgId:"",
                    action:"Upload",
                    isBase64:false
                }
      }
    
   async componentDidMount(){
    const path =  this.props.navigation && this.props.navigation.state && this.props.navigation.state.params
        if(path && path.navigatedFromForm){
            const userToken = await getItem("userInfo")
            this.setState({userToken,navigatedFromForm:true})
            this.props.userProfileRequest({userToken:userToken.token})
        }
    }

    componentDidUpdate(preProps){
        const {userProfile,updateProfile,uploadPotfolio,deletePotfolio} = this.props;
        const {userToken} = this.state;
        if(userProfile.isSuccess !== preProps.userProfile.isSuccess){
            if(userProfile.data && userProfile.data.length){
                const userInfo = userProfile.data[0] 
                this.setState({name:userInfo.name,
                            aboutYourSelf:userInfo.bio,
                            mobileNumber:userInfo.phone.replace("+91",""),
                        websiteLink:userInfo.website_link && userInfo.website_link.replace("https://",""),
                        facricatorPortFolio:userProfile.data[2] ? userProfile.data[2].Portfolio :[],
                        fabExtraData:userProfile.data[2] ? userProfile.data[2].Portfolio :[],
                        })
            }
        }
        if(updateProfile.isSuccess !== preProps.updateProfile.isSuccess){
            this.setState({profileEdit:false,Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
            this.props.userProfileAfterUpdateRequest({userToken:userToken.token})
            if(Platform.OS == 'android') {
                alert("Your profile is successfully updated.");
              } else if( Platform.OS == 'ios'){
                Alert.alert(
                  'Alert',
                  'Your profile is successfully updated.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
              }
        }
        if(uploadPotfolio.isSuccess !== preProps.uploadPotfolio.isSuccess){
            if(uploadPotfolio.isSuccess && uploadPotfolio.data){
                this.setState({isBase64:false,base64Data:[],fabExtraData:[]})
                this.props.userProfileRequest({userToken:userToken.token})
            }
        }
        if(deletePotfolio.isSuccess !== preProps.deletePotfolio.isSuccess){
            if(deletePotfolio.data && deletePotfolio.isSuccess ){
                this.setState({action:"Upload",isBase64:false,base64Data:[],fabExtraData:[]})
                this.props.userProfileRequest({userToken:userToken.token})
            }
        }
    }

    // static getDerivedStateFromProps(props,state){
    //     const {userProfile} = props;
    //     if(!state.navigatedFromForm){
    //         if(userProfile.isSuccess && userProfile.data && userProfile.data.length && userProfile.data[0] ){
    //             const userInfo =userProfile.data && userProfile.data.length && userProfile.data[0] 
    //             return {
    //                 name:userInfo.name,
    //                 aboutYourSelf:userInfo.bio,
    //                 mobileNumber:userInfo.phone.replace("+91",""),
    //                 websiteLink:userInfo.website_link && userInfo.website_link.replace("https://","")
    //             }
    //         }
    //         else{
    //             return null
    //         }
    //     }
    //     else{
    //         return null
    //     }
    // }

    goBack=()=>{
         this.props.navigation.goBack()
    }

    onPortfolioImagePress=(zoomUri)=>{
        this.setState({zoomer:!this.state.zoomer,zoomUri})
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
            this.props.clearUpdateRequest()
            this.setState({errors:{}, profileEdit:!this.state.profileEdit,Mobilefocus:false,aboutYourSelfFocus:false,
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
        if(this.props.logoutFunction){
           this.props.logout()
        }else{
            await removeItem("userInfo")
            this.props.navigation.navigate("Exebition")
        }
    }

    updateProfile=()=>{
        const {mobileNumber, aboutYourSelf,userToken, websiteLink} = this.state;
        const userInfo = this.props.userProfile.data[0] 
       const errors = validate({aboutYourSelf:aboutYourSelf,mobileNumber:mobileNumber,websiteLink:websiteLink},'duringUpdate')
       this.setState({errors})
       if(!Object.keys(errors).length){
        this.props.updateProfileRequest(
                                        {userToken:userToken.token,
                                        id:userInfo.id,
                                        data:{bio:aboutYourSelf,phone:`+91${mobileNumber}`, website_link:`https://${websiteLink}`}}
                                        )
       }
    }

    askStoragePermission = async () =>{
        await Permissions.request('storage').then(response => {
          console.log(response,'per storage')
          return true;
        })
      }

    addPortfolio=async()=>{
        let fabExtraData = this.state.fabExtraData;
        let base64Data = this.state.base64Data;
        if(Platform.OS !== "ios"){
            try {
                const res = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
                });
                if(res && res.length){
                    res.map((img,i)=>{
                    let index = (fabExtraData.length && fabExtraData[fabExtraData.length-1].newId) ? fabExtraData[fabExtraData.length-1].newId+1 : i+1
                        fabExtraData.push({newId: index, image:img.uri})
                        RNFetchBlob.fs.readFile(img.uri, "base64").then(
                            data => {
                                base64Data.push({newId:i ==0 ? base64Data.length+i+1 : base64Data.length+1, image:data})
                            })
                    })
                }
                this.setState({fabExtraData,base64Data,isBase64:true})

            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    alert("Canceled")
                // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                throw err;
                }
            }
        }
    }
    uploadPortfolio=()=>{
        const {facricatorPortFolio,base64Data,userToken} = this.state;
        if(facricatorPortFolio.length){
            this.props.uploadPortfolioequest({userToken:userToken.token,data:{images:base64Data}})
        }
    }

    removeOrDelete=(newId,actionType,index)=>{
        if(actionType === "normal"){
            let fabExtraData= this.state.fabExtraData.filter((item,i)=>item.newId !== newId)
            let base64Data = this.state.base64Data.filter((item,i)=>item.newId !==newId)
            this.setState({fabExtraData,base64Data})
        }else{
            let  fabExtraData =  this.state.fabExtraData;
                if(!fabExtraData[index].newId){
                    if(fabExtraData[index].selected ){
                        delete fabExtraData[index].selected
                        this.setState({fabExtraData,imgId:"",action:"Upload"})
                    }else{
                        fabExtraData[index].selected = true
                        this.setState({fabExtraData,imgId:fabExtraData[index].id,action:"Delete"})
                    }
                }
        }
    }

    deletePotfolio=async()=>{
        const {userToken,imgId} = this.state;
        this.props.deletePortfolioequest({userToken:userToken.token,id:imgId})
    }

    scrollToEnd=(flatListRef)=>{
        const {fabExtraData,isBase64} = this.state;
        if(fabExtraData.length && isBase64){
            flatListRef.scrollToIndex({animated: true, index:fabExtraData.length-1});
        }
    }


    render() {
        const {exhitorProfile,userProfile,updateProfile,uploadPotfolio,deletePotfolio,uName,uAboutYourSelf,uWebsiteLink,uMobileNumber,uMobilefocus,uAboutYourSelfFocus,uWebsiteFocus,uProfileEdit,uerrors} =this.props;
        const {isBase64, base64Data, action, fabExtraData,zoomUri, facricatorPortFolio,zoomer,profileEdit,mobileNumber,websiteLink,name,aboutYourSelf,errors,Mobilefocus,aboutYourSelfFocus,websiteFocus}= this.state
       const userInfo = userProfile.data && userProfile.data.length && userProfile.data[0]
       const websiteError =  updateProfile.data &&  updateProfile.data.website_link && updateProfile.data.website_link[0]
       const phoneError =  updateProfile.data &&  updateProfile.data.phone && updateProfile.data.phone[0]   
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
                {(deletePotfolio.isLoading || uploadPotfolio.isLoading || updateProfile.isLoading || userProfile.isUpdateLoading) && <View style={{flexDirection:'column',justifyContent:"center",alignItems:"center",width:Layout.window.width,height:Layout.window.height-60-StatusBar.currentHeight,bottom:0,backgroundColor:"rgba(0,0,0,.4)",position:"absolute",zIndex:100000}}>
                         <ActivityIndicator size="large" color="#ffffff" />
                </View>}
                
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
                                <Image resizeMode="cover" style={{width:Layout.window.width, height:Layout.window.width}} source={{uri:zoomUri}}/>
                        </ImageZoom>
                    </View>}
                    {userProfile.isSuccess ?  <ScrollView >
                            <View style={styles.profilePicView}>
                                <View style={styles.avatarView}>
                                    <Image resizeMode="cover" style={styles.img} source={require("../../assets/images/avatar.png")} />
                                </View>
                                <View>
                                    <Text style={styles.userNameText}>{uName ? uName : name}</Text>
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
                                        value={uWebsiteLink ? uWebsiteLink : websiteLink}
                                        editable={uProfileEdit ? uProfileEdit : profileEdit}
                                        onFocus={profileEdit ? ()=>{this.setState({websiteFocus:true, Mobilefocus:false,aboutYourSelfFocus:false})} : ()=>this.props.onFocus("web")}
                                        onSubmitEditing={/* profileEdit ? */ (e)=>this.onFieldSubmitting("mobileno") /* : ()=>this.props.onFieldSubmitting("mobileno") */}
                                        onBlur={/* profileEdit ? */ (e)=>this.onFieldSubmitting("") /* :()=> this.props.onFieldSubmitting("") */}
                                        onChangeText={profileEdit ? (websiteLink)=>this.setState({websiteLink}) : (value)=>this.props.onChange(value,'web')}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.horizontalLine,{borderBottomColor:(websiteFocus || uWebsiteFocus) ? "#000000" : "#D7DBDD",borderBottomWidth:(websiteFocus || uWebsiteFocus) ? 2 : 1}]}/>
                            {profileEdit &&<Text style={styles.error}>{websiteError} {uProfileEdit ? uerrors.websiteLink : errors.websiteLink}</Text>}
                            
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
                                        value={uMobileNumber ? uMobileNumber : mobileNumber}
                                        editable={uProfileEdit ? uProfileEdit : profileEdit}
                                        onFocus={profileEdit ? ()=>{this.setState({websiteFocus:false,Mobilefocus:true,aboutYourSelfFocus:false})} : ()=>this.props.onFocus("mobile")}
                                        onSubmitEditing={/* profileEdit ?  */(e)=>this.onFieldSubmitting("aboutYourSelf") /* : ()=>this.props.onFieldSubmitting("aboutYourSelf") */}
                                        onBlur={/* profileEdit ? */ (e)=>this.onFieldSubmitting("") /*  :()=> this.props.onFieldSubmitting("") */}
                                        onChangeText={profileEdit ? (mobileNumber)=>this.setState({mobileNumber}) : (value)=>this.props.onChange(value,'mobile')}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.horizontalLine,{borderBottomColor:(Mobilefocus || uMobilefocus) ? "#000000" : "#D7DBDD",borderBottomWidth:(Mobilefocus || uMobilefocus) ? 2 : 1}]}/>
                            {profileEdit && <Text style={styles.error}> {phoneError}{uProfileEdit ? uerrors.mobileNumber : errors.mobileNumber}</Text>}
                           
                            
                            <View style={styles.itemWrapper}>
                                <Item style={[styles.fromItem,{borderColor:"transparent"}]} stackedLabel>
                                <Label style={styles.title}>{exhitorProfile ? "Address" : "About your self"}</Label>
                                    {(profileEdit  || uProfileEdit ) ? 
                                      
                                        <Textarea 
                                            ref="aboutYourSelf"
                                            numberOfLines={20}
                                            value= {uAboutYourSelf ? uAboutYourSelf : aboutYourSelf}
                                            style={[styles.inputTextAreaSize,{marginTop:(profileEdit || uProfileEdit) ? 15 : -10,borderWidth:(profileEdit || uProfileEdit) ? 1 : 0,}]}
                                            placeholder={'About yourself...'}      
                                            placeholderTextColor="#E6E5E2"
                                            disabled={(uProfileEdit !==undefined ) ? !uProfileEdit : !profileEdit}
                                            onFocus={/* profileEdit ? */ ()=>{this.setState({websiteFocus:false, Mobilefocus:false,aboutYourSelfFocus:true})} /* : ()=>this.props.onFocus("about") */}
                                            onBlur={/* profileEdit ? */ (e)=>this.onFieldSubmitting("") /* :()=> this.props.onFieldSubmitting("") */}
                                            onChangeText={profileEdit ? (aboutYourSelf)=>this.setState({aboutYourSelf}) : (value)=>this.props.onChange(value,'about')}
                                        /> 
                                        :<Text style={[styles.item,{width:"100%",paddingLeft:5,marginBottom:8}]} >{uAboutYourSelf ? uAboutYourSelf : aboutYourSelf}</Text> 
                                    }
                            </Item>
                            </View>
                            
                            <View style={[styles.horizontalLine,{borderBottomColor:(aboutYourSelfFocus || uAboutYourSelfFocus) ? "#000000" : "#D7DBDD",borderBottomWidth:(aboutYourSelfFocus || uAboutYourSelfFocus) ? 2 : 1}]}/>
                            {profileEdit &&<Text style={styles.error}>{uProfileEdit ? uerrors.aboutYourSelf : errors.aboutYourSelf}</Text>}
                            {(!exhitorProfile && userProfile.data.length && userProfile.data[0].role === "fabricator") &&
                            <>
                            <View style={styles.portfolioWrapper}>
                                <View style={styles.plusIconView}>
                                    <Text  style={styles.portfoliotitle}>Portfolio</Text>
                                    <View style={{flexDirection:"row"}}>
                                        <Icon
                                            onPress={this.addPortfolio}
                                            type={"AntDesign"}
                                            name={"plus"}
                                            style={styles.plusIcon}
                                        />
                                       {(action ==="Delete" || isBase64) &&
                                            <TouchableOpacity onPress={action ==="Delete" ? this.deletePotfolio : this.uploadPortfolio}>
                                                <Text  style={styles.portfoliotitle}>{action}</Text>
                                            </TouchableOpacity>
                                         }
                                    </View>
                                    
                                </View>
                                {(userProfile.data.length > 1 && userProfile.data[2].Portfolio.length || facricatorPortFolio.length >0 ) ?
                                    <Portfolio 
                                        onPortfolioImagePress ={this.onPortfolioImagePress}
                                        horizontal={true}
                                        portfolioData={fabExtraData }
                                       isApiData ={userProfile.data.length > 1 && userProfile.data[2].Portfolio.length ? true : false }
                                       fabExtraData={fabExtraData}
                                       removeOrDelete={this.removeOrDelete}
                                       from = "potfolio"
                                       scrollToEnd={this.scrollToEnd}
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
                {(profileEdit && userInfo && (userInfo.name !== name || userInfo.website_link !== websiteLink || userInfo.phone.replace("+91","") !== mobileNumber || aboutYourSelf !== userInfo.bio) || uProfileEdit ) &&
                <TouchableOpacity onPress={uProfileEdit ? ()=>this.props.updateProfile() : this.updateProfile} activeOpacity={.7}>
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
        uploadPotfolio:state.user.uploadPotfolio,
        deletePotfolio:state.user.deletePotfolio,
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