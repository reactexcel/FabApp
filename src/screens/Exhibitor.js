import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text, BackHandler, } from 'react-native';
import Header from "../generic/Header";
import SplashScreen from "react-native-splash-screen";
import FabricatorProfile from "./FabricatorProfile";
import ExhibitorQuotes from "../components/ExhibitorQuotes";


export default class Exhibitor extends React.Component {
    static navigationOptions = {
        header: null
      };
  state = {
    index: 0,
    scrollToIndex:0,
    flatListRefState :'',
    profileEdit:false
  };

  goBack=()=>{
    this.props.navigation.goBack()
  }
  
  componentDidMount() {
    SplashScreen.hide();
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
    return (
        <>
        <Header
          isLeft={true}
          leftIcon={"arrowleft"}
          isCenter={true}
          leftIconCategory={ "AntDesign"}
          isRight={true}
          rightIconCategoty={"MaterialCommunityIcons"}
          rightIcon={profileEdit ? "pencil-off" : index == 0 ? "pencil"  : ""}
          centerText={""}
          goBack={this.goBack}
          onPressRight={this.onProfileEdit}
        />
        <View style={styles.tabBar}>
            <TouchableOpacity
              activeOpacity={.7}
              style={styles.tabItem}
              onPress={() => this.setState({ index: 0})}>
              <Text style={ {color:this.state.index ==0 ? "#000000" :"#a59e9e"}}>Profile</Text>
              <View style={[styles.tabBottomLine,{borderBottomColor:this.state.index ==0 ? "#000000" :"#a59e9e",}]}></View>
            </TouchableOpacity>
            <TouchableOpacity
             activeOpacity={.7}
              style={styles.tabItem}
              onPress={() => this.setState({ index: 1})}>
              <Text style={ {color:this.state.index ==1 ? "#000000" :"#a59e9e"}}>Quotes</Text>
              <View style={[styles.tabBottomLine,{borderBottomColor:this.state.index ==1 ? "#000000" :"#a59e9e",}]}></View>
            </TouchableOpacity>
      </View>
      {index ==0 &&
        <FabricatorProfile exhitorProfile={true}/>
      }
      {index ==1 &&
        <ExhibitorQuotes />
      }
      </>
    );
  }
}

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
  }
});

