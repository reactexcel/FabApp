import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import ExhibitionList from "../components/ExhibitionList";
import Header from "../generic/Header";

export default class Exebition extends Component {
    static navigationOptions = {
        header: null
      };
    render() {
        return (
            <>
                <Header/>
                <ScrollView>
                  <ExhibitionList/>
                </ScrollView>
            </>
        )
    }
}
