import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text, BackHandler,Dimensions } from 'react-native';
import Header from "../generic/Header";
import SplashScreen from "react-native-splash-screen";
import FabricatorProfile from "./FabricatorProfile";
import ExhibitorQuotes from "../components/ExhibitorQuotes";
import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
import {setItem, getItem} from "../helper/storage";
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import { connect } from 'react-redux';


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
    const {profileEdit} = this.state;
    if(!profileEdit){
        // this.refs.mobileNumber._root.focus()
        this.setState({profileEdit:!this.state.profileEdit})
    }
    else{
        this.setState({profileEdit:!this.state.profileEdit,Mobilefocus:false,aboutYourSelfFocus:false})
    }
}

 
  render() {
    const {index,profileEdit} =this.state;
    const {userProfile} = this.props
    return (
        <>
        <Header
          isLeft={true}
          leftIcon={"arrowleft"}
          isCenter={true}
          leftIconCategory={ "AntDesign"}
          isRight={true}
          rightIconCategoty={"MaterialCommunityIcons"}
          rightIcon={profileEdit ? "pencil-off" : index == 0 ? "pencil"  : "plus"}
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
          renderScene={SceneMap({
            profile:()=> <FabricatorProfile exhitorProfile={true}/>,
            quotes:()=> <ExhibitorQuotes portfolioData={userProfile.data.length && userProfile.data.length >0  && userProfile.data[1].exhbhition_request} />,
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

