import React, { Component } from 'react'
import { Text, View,ScrollView, Image, StyleSheet } from 'react-native'
import ExhibitionList from "../components/ExhibitionList";
import Header from "../generic/Header";
import SplashScreen from 'react-native-splash-screen'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import ErrorLoader from "../generic/ErrorLoader";
import NoData from "../generic/nodata";
import {setItem, getItem,removeItem} from "../helper/storage";


 class Exebition extends Component {
    static navigationOptions = {
        header: null
      };

    toForm=(id)=>{
      const addQuote = this.props.navigation.state.params && this.props.navigation.state.params.addQuote
      if(addQuote){
        this.props.navigation.navigate("WorkerForm",{id,addQuote:true})
      }
        this.props.navigation.navigate("WorkerForm",{id})
    }
    goBack=()=>{
        this.props.navigation.goBack()
      }

  async  componentDidMount() {
    const addQuote = this.props.navigation.state.params && this.props.navigation.state.params.addQuote
      const userToken = await getItem("userInfo")
      if(!addQuote && userToken && userToken.role ==="fabricator"){
        SplashScreen.hide();
        this.props.navigation.replace("FabricatorProfile",{navigatedFromForm:true})
      }
      else if(!addQuote && userToken && userToken.role ==="exhibitor"){
        // SplashScreen.hide();
        this.props.navigation.replace("Exhibitor")
      }
      else{
        SplashScreen.hide();
        this.props.exhibitionListRequest()
        this.props.productListRequest()
      }
    }

    componentDidUpdate(preProps){
      const {alleEhibitionList} = this.props;
      if(alleEhibitionList.isSuccess !== preProps.alleEhibitionList.isSuccess || 
        alleEhibitionList.isError !== preProps.alleEhibitionList.isError
        ){
        if(alleEhibitionList.exhibitions && alleEhibitionList.exhibitions.length){
          // SplashScreen.hide();
        }
        else{
          // SplashScreen.hide();
        }
      }
    }

    render() {
      const {alleEhibitionList} = this.props;
      const addQuote = this.props.navigation.state.params && this.props.navigation.state.params.addQuote
        return (
            <>
                <Header 
                    isLeft={true}
                    isCenter={true}
                    centerText={addQuote ? "Add Quote" : "All Exhibititions"}
                    leftIcon={addQuote ? "arrowleft" : null}
                    leftIconCategory={"AntDesign"}
                    isNotRightThenWidth={addQuote ? "70%" : "75"}
                    goBack={this.goBack}
                 />
                {(alleEhibitionList.isLoading || alleEhibitionList.isError) &&
                  <ErrorLoader handlerData={alleEhibitionList} />
                }
                
                {(alleEhibitionList.isSuccess && alleEhibitionList.exhibitions &&  alleEhibitionList.exhibitions.length) ?
                  <ScrollView>
                    <ExhibitionList alleEhibitionList={alleEhibitionList}  toForm={this.toForm}/>
                  </ScrollView>
                :
                <>
                {alleEhibitionList.isSuccess && <NoData message ={"Sorry! No exhibition avaliable at the time."} />
                }
                </>
                } 
            </>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    alleEhibitionList:state.productNexhibition.exhibiton
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Exebition)