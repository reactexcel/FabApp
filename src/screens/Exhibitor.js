import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text, BackHandler,Dimensions } from 'react-native';
import Header from "../generic/Header";
import SplashScreen from "react-native-splash-screen";
import FabricatorProfile from "./FabricatorProfile";
import ExhibitorQuotes from "../components/ExhibitorQuotes";
import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
import {setItem,removeItem, getItem} from "../helper/storage";
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import validate from "../helper/validation";


 class Exhibitor extends React.Component {
    static navigationOptions = {
        header: null
      };
  state = {
        index: 0,
        profileEdit:false,
        routes: [
          { key: 'profile', title: 'Profile'},
          { key: 'quotes', title: 'Quotes' },
        ],
        Mobilefocus:false,
        aboutYourSelfFocus:false,
        websiteFocus:false,
        mobileNumber:"",
        websiteLink:"",
        aboutYourSelf:"",
        userToken:undefined,
        errors:{},
  };

  goBack=()=>{
    this.props.navigation.goBack()
  }
  
 async componentDidMount() {
    const userToken = await getItem("userInfo")
        SplashScreen.hide();
        this.props.userProfileRequest({userToken:userToken.token})
  }
  onProfileEdit=()=>{
    const {profileEdit,index} = this.state;
    const {userProfile} = this.props;
    const userInfo = userProfile.data[0]
    if(index == 1){
      this.props.navigation.navigate("Exebition",{addQuote:true})
    }
    else{ 
      if(!profileEdit){
          // this.refs.websiteLink._root.focus()
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

}

   componentDidUpdate(preProps){

    const {userProfile,} = this.props;
    if(userProfile.isSuccess !== preProps.userProfile.isSuccess){
        if(userProfile.isSuccess && userProfile.data && userProfile.data.length){
          console.log(">>>>>>>>>>>>>>>>>>>>>>>update");
          
            const userInfo = userProfile.data[0] 
            this.setState({name:userInfo.name,
                          aboutYourSelf:userInfo.bio,
                          mobileNumber:userInfo.phone.replace("+91",""),
                          websiteLink:userInfo.website_link && userInfo.website_link.replace("https://",""),
                    })
        }
    }
   }

  logout=async()=>{
    await removeItem("userInfo")
    this.props.navigation.navigate("Exebition")
  }

  toFabList=(exhId, id)=>{
    this.props.navigation.navigate("Fabricator",{exhId,id})
  }

  onChange=(value,type)=>{
    if(type === "web"){
      this.setState({websiteLink:value})
    }else if(type === "mobile"){
      this.setState({mobileNumber:value})
    }else{
      this.setState({aboutYourSelf:value})
    }
  }
  onFocus=(type)=>{
    // if(type === "web"){
    //   this.setState({websiteFocus:true, Mobilefocus:false,aboutYourSelfFocus:false})
    // }
    // else if(type === "mobile"){
    //   this.setState({websiteFocus:false,Mobilefocus:true,aboutYourSelfFocus:false})
    // }
    // else{
    //   this.setState({websiteFocus:false, Mobilefocus:false,aboutYourSelfFocus:true})
    // }
  }
  
  onFieldSubmitting=(field)=>{
    console.log("rdtfgyuhjikolp;");
    
    // if(field === "aboutYourSelf"){
    //     this.setState({Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
    //     // this.refs.aboutYourSelf._root.focus()
    // }
    // else if(field === "mobileno"){
    //     this.setState({Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
    //     // this.refs.mobileNumber._root.focus()
    // }
    // else{
    //     this.setState({Mobilefocus:false,aboutYourSelfFocus:false,websiteFocus:false})
    // }
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
 
  render() {
    const {index,profileEdit,name,aboutYourSelf,mobileNumber,websiteLink,Mobilefocus,aboutYourSelfFocus,websiteFocus,errors} =this.state;
    const {userProfile} = this.props
    console.log(this.state,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    
    return (
        <>
        <Header
          isLeft={true}
          // leftIcon={"arrowleft"}
          isCenter={true}
          leftIconCategory={ "AntDesign"}
          isRight={true}
          rightIconCategoty={"MaterialCommunityIcons"}
          rightIcon={(profileEdit && index == 0) ? "pencil-off" : index == 0 ? "pencil"  : "plus"}
          centerText={""}
          goBack={this.goBack}
          onPressRight={this.onProfileEdit}
        />
        <TabView
          navigationState={this.state}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#000000', }}
              style={{ backgroundColor:'#ffffff',}}
              activeColor="#000000"
              inactiveColor="#a59e9e"
            />
          }
          keyboardDismissMode = "none"
          renderScene={SceneMap({
            profile:()=> <FabricatorProfile 
                            logoutFunction ={true} 
                            logout={this.logout} 
                            exhitorProfile={true}
                            uName={name}
                            uAboutYourSelf={aboutYourSelf}
                            uWebsiteLink={websiteLink}
                            uMobileNumber={mobileNumber}
                            uMobilefocus={Mobilefocus}
                            uAboutYourSelfFocus={aboutYourSelfFocus}
                            uWebsiteFocus={websiteFocus}
                            uProfileEdit={profileEdit}
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            onFieldSubmitting={this.onFieldSubmitting}
                            uerrors={errors}
                            updateProfile={this.updateProfile}
                            

                          />,
            quotes:()=> <ExhibitorQuotes  
                            toFabList={this.toFabList} 
                            userProfile={userProfile} 
                            portfolioData={userProfile.data.length && userProfile.data.length >0  && userProfile.data[1].exhbhition_request} 
                        />,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          indicatorStyle={{backgroundColor:'red',width:500}}
          
      />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userProfile:state.user.userProfile,
  }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Exhibitor)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop:16,
  },
  headerText:{
    fontSize:16
  },
  tabBottomLine:{ 
    borderBottomWidth:2,
    height:1,
    width:"100%",
    position:"absolute",
    bottom:0 
  },
  formCompletionBar:{
    height:4,
    backgroundColor:"#E1C811"
  },
  scene: {
    flex: 1,
  },
});

