import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import Header from "../generic/Header";
import ExhibitorForm from "../components/ExhibitorForm";

export default class WorkerForm extends React.Component {
    static navigationOptions = {
        header: null
      };
  state = {
    index: 0,
  };

  render() {
    const {index} =this.state;
    return (
        <>
        <Header/>
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
        {index ==0 && <ExhibitorForm/>}
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