import React, { Component } from 'react'
import { Text, View , TouchableOpacity,StatusBar, StyleSheet,ActivityIndicator } from 'react-native'
import Header from "../generic/Header";
import SplashScreen from 'react-native-splash-screen'
import FormProducts from "../components/FormProducts";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import ErrorLoader from "../generic/ErrorLoader";
import {getItem} from "../helper/storage";
import alert from "../helper/alert";
import Layout from "../helper/Layout"


class Fabricator extends Component {
    static navigationOptions = {
        header: null
      };
      state ={fabExtraData:[],selectedFab:[],lastId:'',lastIndex:'',userToken:""}

    goBack=()=>{
        this.props.navigation.goBack();
      }
      async componentDidMount(){
          SplashScreen.hide()
          const userToken = await getItem("userInfo")
          this.setState({userToken})
          this.props.fabricatorListRequest({id:this.props.navigation.state.params.exhId})
      }

      componentDidUpdate(preProps){
          const {fabList,addFabricator} = this.props;
          if(fabList.isSuccess !== preProps.fabList.isSuccess){
              if(fabList.list && fabList.list.length>0){
                  this.setState({fabExtraData:fabList.list})
              }
          }
          if(addFabricator.isSuccess !== preProps.addFabricator.isSuccess){
              if(addFabricator.isSuccess){
                  alert("Fabricator has added successfully!")
              }
          }
          if(addFabricator.isError !== preProps.addFabricator.isError){
            if(addFabricator.isError){
                alert("This fabricator has already added!")
            }
          }
      }
      onRadioButtonPress=(index,item, selected)=>{
          const {lastId,lastIndex} = this.state;
          let selectedFab = []
                let  fabExtraData =  Object.assign({}, this.state.fabExtraData);
                fabExtraData[index].selected = !fabExtraData[index].selected
                if(lastIndex !==""){
                    fabExtraData[lastIndex].selected = false
                }
                if(lastId !==""){
                    selectedFab = this.state.selectedFab.filter((id,i)=> id !== lastId)
                }
                    selectedFab.push(item.id)
                this.setState({selectedFab, fabExtraData,lastId:item.id,lastIndex:index})
    }

    addFabricator=()=>{
        const {selectedFab,userToken} =this.state;
        const payload ={
                        fabId:selectedFab[0],
                        exhibitionId:this.props.navigation.state.params.id,
                        userToken:userToken.token
                    }
        this.props.addFabricatorRequest(payload)
    }
    render() {
        const {fabList,addFabricator} = this.props;
        const {fabExtraData} = this.state;        
        return (
            <View style={{flex:1}}>
            {(addFabricator.isLoading) && <View style={{flexDirection:'column',justifyContent:"center",alignItems:"center",width:Layout.window.width,height:Layout.window.height-60-StatusBar.currentHeight,bottom:0,backgroundColor:"rgba(0,0,0,.4)",position:"absolute",zIndex:100000}}>
                         <ActivityIndicator size="large" color="#ffffff" />
                </View>}
                <Header
                    goBack={this.goBack}
                    isLeft={true}
                    leftIcon={"arrowleft"}
                    leftIconCategory={"AntDesign"}
                    isNotRightThenWidth={"70%"}
                    isCenter={true}
                    centerText={"Fabricators"}
                />
                {fabList.isSuccess ? 
                    <View style={{flex:1,paddingTop:10}}>
                    
                        <FormProducts 
                            item={fabList.list}
                            extraDataFormProduct={fabExtraData}
                            onRadioButtonPress={this.onRadioButtonPress}
                            fablist={true}
                        />
                        <TouchableOpacity onPress={this.addFabricator} activeOpacity={.7}>
                            <View style={styles.tapToContinueButtonView}>
                                <Text style={styles.continueText}>Add</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : <ErrorLoader handlerData={fabList} />}
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      fabList:state.productNexhibition.fabList,
      addFabricator:state.productNexhibition.addFabricator,
    }
  }
  
  const mapDispatchToProps = dispatch => 
      bindActionCreators(actions, dispatch);
  
  export default connect(mapStateToProps,mapDispatchToProps)(Fabricator)


  const styles = StyleSheet.create({
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
    }
  })