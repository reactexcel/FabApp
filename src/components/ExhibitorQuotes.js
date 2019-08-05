import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Portfolio from "./Portfolio";
import ErrorLoader from "../generic/ErrorLoader";

export default class ExhibitorQuotes extends Component {

    toFabList=(exhId ,id)=>{
        this.props.toFabList(exhId, id)
    }
    render() {
        const {portfolioData,userProfile} = this.props;
        return (
            <>
          {userProfile.isSuccess ? 
             <View style={{backgroundColor:"#ffffff",flex:1}}>
                <Portfolio toFabList={this.toFabList} from="quote" portfolioData={portfolioData} horizontal={false}/>
            </View>
            :
            <ErrorLoader  handlerData={userProfile} />}
             </>
        )
    }
}
