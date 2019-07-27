import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text, BackHandler, } from 'react-native';
import Header from "../generic/Header";
import ExhibitorForm from "../components/ExhibitorForm";
import FabricatorForm from "../components/FabricatorForm";
import item from "../constants/furniture.json"

export default class WorkerForm extends React.Component {
    static navigationOptions = {
        header: null
      };
  state = {
    index: 0,
    scrollToIndex:0,
    flatListRefState :'',
    errors:{},
    formProduct:item,
    extraDataFormProduct:item,
    exhibitorDetail:{
                      stallSize:'2',
                      stallNo:'12',
                      colorTheme:'red',
                      branding:[],
                      furniture:[],
                      products:[], 
                      carpetColor:'blue',
                      websiteLink:'www.google.com',
                      name:'johndoe',
                      mobileNo:'9012345678',
                      email:'johndoe@gamil.com',
                      aboutYourSelf:'its me johndoe'
                    }
  };

  goBack=()=>{
    this.props.navigation.goBack()
  }
  
  goToFabricatorProfile=()=>{
    this.props.navigation.navigate("FabricatorProfile")
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

  onTextChange=(value,name)=>{
    let exhibitorDetail = {...this.state.exhibitorDetail}
    exhibitorDetail[name] =value
    this.setState({exhibitorDetail})
  }

  onRadioButtonPress=(index,categoryIndex)=>{
        let extraDataFormProduct =  Object.assign({}, this.state.extraDataFormProduct);
        extraDataFormProduct[index].selected = !extraDataFormProduct[index].selected
        this.setState({extraDataFormProduct})
        if(categoryIndex == 3){
          let brand = []
        }
  }
 
  render() {
    const {index,scrollToIndex,exhibitorDetail,formProduct,extraDataFormProduct} =this.state;
    return (
        <>
        <Header
          goBack={this.goBack}
          isLeft={true}
          leftIcon={"arrowleft"}
          leftIconCategory={"AntDesign"}
          isNotRightThenWidth={"70%"}
          isCenter={true}
          centerText={"Registration"}
         />
         {index ==0 && 
          <View style={[styles.formCompletionBar,{width:`${scrollToIndex*12.5}%`}]}></View>
        }
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
              onPress={() => this.setState({ index: 1,})}>
              <Text style={ {color:this.state.index ==1 ? "#000000" :"#a59e9e"}}>Fabricator</Text>
              <View style={[styles.tabBottomLine,{borderBottomColor:this.state.index ==1 ? "#000000" :"#a59e9e",}]}></View>
            </TouchableOpacity>
      </View>
      {index ==0 &&
        <ExhibitorForm
          onTextChange={this.onTextChange}
          exhibitorDetail={exhibitorDetail}
          scrollToIndexHandler={this.scrollToIndexHandler}
          scrollToIndex={scrollToIndex}
          productItem={formProduct}
          onRadioButtonPress={this.onRadioButtonPress}
          extraDataFormProduct={extraDataFormProduct}
        />
      }{index ==1 &&
        <FabricatorForm
          goToFabricatorProfile={this.goToFabricatorProfile}
          onTextChange={this.onTextChange}
          exhibitorDetail={exhibitorDetail}
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
