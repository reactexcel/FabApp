import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import ExhibitionList from "../components/ExhibitionList";
import Header from "../generic/Header";

export default class Exebition extends Component {
    static navigationOptions = {
        header: null
      };

    toForm=()=>{
    this.props.navigation.navigate("WorkerForm")
    }
    goBack=()=>{
        this.props.navigation.goBack()
      }
    render() {
        return (
            <>
                <Header 
                    isLeft={true}
                    isCenter={true}
                    centerText={"All Exhibititions"}
                    leftIcon={"arrowleft"}
                    isNotRightThenWidth={"75%"}
                    goBack={this.goBack}
                 />
                <ScrollView>
                  <ExhibitionList  toForm={this.toForm}/>
                </ScrollView>
            </>
        )
    }
}
