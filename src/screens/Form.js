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
    scrollToIndex:0,
    flatListRefState :''
  };

  goBack=()=>{
    this.props.navigation.goBack()
  }

  scrollToIndexHandler = (index,length,flatListRef) => {
    const {scrollToIndex,flatListRefState} = this.state;
    if(!flatListRefState){
      this.setState({flatListRefState:flatListRef})
    }
    if(length>index){
        flatListRef.scrollToIndex({animated: true, index:index});
    }
    if( length > index){
        this.setState({scrollToIndex:scrollToIndex+1})
    }
  } 

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress =async () => {
    const {scrollToIndex,flatListRefState} = this.state;
        if(scrollToIndex > 0){
          flatListRefState.scrollToIndex({animated: true, index:scrollToIndex-1});
            this.setState({scrollToIndex:scrollToIndex-1})
        }
        else{
            this.props.navigation.goBack();
        }
  }
 
  render() {
    const {index,scrollToIndex} =this.state;
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
         <View style={[styles.formCompletionBar,{width:`${scrollToIndex*16.6666}%`}]}></View>
        <View style={styles.tabBar}>
            <TouchableOpacity
              activeOpacity={.7}
              style={styles.tabItem}
              onPress={() => this.setState({ index: 0})}>
              <Text style={ {color:this.state.index ==0 ? "#000000" :"#a59e9e"}}>Exhibitor</Text>
              <View style={[styles.tabBottomLine,{borderBottomColor:this.state.index ==0 ? "#000000" :"#a59e9e",}]}></View>
            </TouchableOpacity>
            <TouchableOpacity
             activeOpacity={.7}
              style={styles.tabItem}
              onPress={() => this.setState({ index: 1})}>
              <Text style={ {color:this.state.index ==1 ? "#000000" :"#a59e9e"}}>Fabricator</Text>
              <View style={[styles.tabBottomLine,{borderBottomColor:this.state.index ==1 ? "#000000" :"#a59e9e",}]}></View>
            </TouchableOpacity>
      </View>
      {index ==0 &&
        <ExhibitorForm
          scrollToIndexHandler={this.scrollToIndexHandler}
          scrollToIndex={scrollToIndex}
        />
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
