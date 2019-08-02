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
                    action:"Upload"
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
                        websiteLink:userInfo.website_link,
                        facricatorPortFolio:userProfile.data[2] ? userProfile.data[2].Portfolio :[],
                        fabExtraData:userProfile.data[2] ? userProfile.data[2].Portfolio :[],
                        })
            }
        }
        if(updateProfile.isSuccess !== preProps.updateProfile.isSuccess){
            this.setState({profileEdit:false,Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
            this.props.userProfileAfterUpdateRequest({userToken:userToken.token})
            if(Platform.OS == 'android') {
                ToastAndroid.showWithGravityAndOffset(
                  'Your profile is successfully updated.',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
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
                this.props.userProfileRequest({userToken:userToken.token})
            }
        }
        if(deletePotfolio.isSuccess !== preProps.deletePotfolio.isSuccess){
            if(deletePotfolio.isSuccess ){
                this.setState({action:"Upload"})
                this.props.userProfileRequest({userToken:userToken.token})
            }
        }
    }

    static getDerivedStateFromProps(props,state){
        const {userProfile} = props;
        if(!state.navigatedFromForm){
            if(userProfile.isSuccess && userProfile.data && userProfile.data.length && userProfile.data[0] ){
                const userInfo =userProfile.data && userProfile.data.length && userProfile.data[0] 
                return {
                    name:userInfo.name,
                    aboutYourSelf:userInfo.bio,
                    mobileNumber:userInfo.phone.replace("+91",""),
                    websiteLink:userInfo.website_link
                }
            }
            else{
                return null
            }
        }
        else{
            return null
        }
    }

    goBack=()=>{
         this.props.navigation.goBack()
    }

    onPortfolioImagePress=(zoomUri)=>{
        console.log(zoomUri,'onPortfolioImagePressonPortfolioImagePressonPortfolioImagePress');
        
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
        let fabExtraData = this.state.fabExtraData
        let base64Data =[]
        try {
            const res = await DocumentPicker.pickMultiple({
              type: [DocumentPicker.types.images],
            });
            if(res && res.length){
                res.map((img,i)=>{
                    fabExtraData.push({newId:i+1, image:img.uri})
                    RNFetchBlob.fs.readFile(img.uri, "base64").then(
                        data => {
                            base64Data.push({newId:i+1, image:data})
                        })
                })
            }
            this.setState({fabExtraData,base64Data})
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('errorrrrrrrrrrrr');
                
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    //  if(Platform.OS !== "ios"){
    //     await Permissions.checkMultiple(['location']).then(response => {
    //       console.log(response,'check')
    //       if(response.storage != 'authorized'){
    //         this.askStoragePermission();
    //       } else {
    //         return true;
    //       }
    //     })}
    //     // this.props.change({ resume_file: [] });
    //     let resumeData = this.state.resumeData;
    //     this.setState({ converting: true });
    //     if (Platform.OS !== "ios") {
    //       //Android Only
    //     await  DocumentPicker.pick(
    //         {
    //           filetype: [DocumentPickerUtil.images()]
    //         },
    //         (error, res) => {
    //           console.log(res);
              
    //           SplashScreen.hide();
    //           this.scroll.scrollToEnd()
    //           this.setState({whenAddedResume:true})
    //           if (res) {
    //             let check =
    //               this.state.resumeData.length >= 1
    //                 ? this.state.currentType == res.type
    //                 : true;
    //             if (check) {
    //               let type = res.type.split("/");
    //               RNFetchBlob.fs.readFile(res.uri, "base64").then(
    //                 data => {
    //                   resumeData.push({
    //                     fileName: res.fileName,
    //                     dataBase64: data,
    //                     filetype: type[1]
    //                   });
    //                 //   let base64 = require('base-64');
    //                 //   let decodedData = base64.decode(data);
    //                 //   let bytes = decodedData.length;
    //                 //   let fileSizeInMB=(bytes / 1000000)
    //                 //   if(fileSizeInMB > 2 ){
    //                 //     alert("File size can't be larger than 2MB");
    //                 //   }
    //                   this.setState({
    //                     converting: false,
    //                     resumeData,
    //                     currentType: res.type
    //                   });
    //                 },
    //                 error => {
    //                   // console.log(error,'asdas')
    //                   this.setState({ converting: false });
    //                 }
    //               );
    //             } else {
    //               this.setState({ converting: false, resumeError: null });
    //               alert("Please select same format for files");
    //             }
    //           } else {
    //             this.setState({ converting: false, resumeError: null });
    //           }
    //         }
    //       );
        // }
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
            this.setState({fabExtraData})
        }else{
            let  fabExtraData =  this.state.fabExtraData;
                if(!fabExtraData[index].newId){
                    if(fabExtraData[index].selected ){
                        delete fabExtraData[index].selected
                        this.setState({fabExtraData,imgId:"",action:"Update"})
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


    render() {
        const {exhitorProfile,userProfile,updateProfile,uploadPotfolio,deletePotfolio} =this.props;
        const {action, fabExtraData,zoomUri, facricatorPortFolio,zoomer,profileEdit,mobileNumber,websiteLink,name,aboutYourSelf,errors,Mobilefocus,aboutYourSelfFocus,websiteFocus}= this.state
       const userInfo = userProfile.data && userProfile.data.length && userProfile.data[0]  
       const websiteError =  updateProfile.data &&  updateProfile.data.website_link && updateProfile.data.website_link[0]
       const phoneError =  updateProfile.data &&  updateProfile.data.phone && updateProfile.data.phone[0]   
           console.log(this.state.fabExtraData,'base64Data');
           
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
                            {profileEdit &&<Text style={styles.error}>{websiteError} {errors.websiteLink}</Text>}
                            
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
                            {profileEdit && <Text style={styles.error}> {phoneError}{errors.mobileNumber}</Text>}
                           
                            
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
                            {profileEdit &&<Text style={styles.error}>{errors.aboutYourSelf}</Text>}
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
                                        <TouchableOpacity onPress={action ==="Delete" ? this.deletePotfolio : this.uploadPortfolio}>
                                            <Text  style={styles.portfoliotitle}>{action}</Text>
                                        </TouchableOpacity>
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