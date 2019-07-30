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


 class Exebition extends Component {
    static navigationOptions = {
        header: null
      };

    toForm=(id)=>{
        this.props.navigation.navigate("WorkerForm",{id})
    }
    goBack=()=>{
        this.props.navigation.goBack()
      }

    componentDidMount() {
      SplashScreen.hide();
      this.props.exhibitionListRequest()
      this.props.productListRequest()
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
        return (
            <>
                <Header 
                    isLeft={true}
                    isCenter={true}
                    centerText={"All Exhibititions"}
                    // leftIcon={"arrowleft"}
                    leftIconCategory={"AntDesign"}
                    isNotRightThenWidth={"75%"}
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
                <NoData message ={"Sorry! No exhibition avaliable at the time."} />
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