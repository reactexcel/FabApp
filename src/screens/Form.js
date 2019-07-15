import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text, BackHandler } from 'react-native';
import Header from "../generic/Header";
import ExhibitorForm from "../components/ExhibitorForm";

export default class WorkerForm extends React.Component {
    static navigationOptions = {
        header: null
      };
  state = {
    index: 0,
  };

  goBack=()=>{
    this.props.navigation.goBack()
  }

 
  render() {
    const {index} =this.state;
    return (
        <>
        <Header
          goBack={this.goBack}
          isLeft={true}
          leftIcon={"arrowleft"}
          isNotRightThenWidth={"70%"}
          isCenter={true}
          centerText={"Registration"}
          goBack={this.goBack}
         />
        <View style={styles.tabBar}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: 0})}>
              <Text style={ {color:this.state.index ==0 ? "#000000" :"#a59e9e"}}>Exhibitor</Text>
              <View style={[styles.tabBottomLine,{borderBottomColor:this.state.index ==0 ? "#000000" :"#a59e9e",}]}></View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: 1})}>
              <Text style={ {color:this.state.index ==1 ? "#000000" :"#a59e9e"}}>Fabricator</Text>
              <View style={[styles.tabBottomLine,{borderBottomColor:this.state.index ==1 ? "#000000" :"#a59e9e",}]}></View>
            </TouchableOpacity>
      </View>
        {index ==0 && <ExhibitorForm  goBack={this.goBack}/>}
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
    // borderWidth:1
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
  }
});
