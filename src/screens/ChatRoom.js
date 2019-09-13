import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import SplashScreen from "react-native-splash-screen";
import Header from "../generic/Header";
import data from "../constants/exhibition.json";
import Portfolio from "../components/Portfolio";
import {Input} from "native-base";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import {getItem} from "../helper/storage";
import { TextInput } from 'react-native-gesture-handler';

 class ChatRoom extends Component {
    static navigationOptions = {
        header: null
      };
      state={message:""}

    async componentDidMount() {
        SplashScreen.hide();
    }

    goBack=()=>{
        this.props.navigation.goBack()
    }


    messageHandler= async ()=>{
        const {message} = this.state;
        const user_id =this.props.navigation.state.params.user_id
        const userToken = await getItem("userInfo")
        const payload ={
            user_id,
            message,
            userToken:userToken.token
        }
        if(message !=='' && message.trim() !==''){
            await this.props.chatMessageRequest(payload)
        }
    }
    render() {
        return (
            <View style={{flex:1}} >
                 <Header 
                    isLeft={true}
                    isCenter={true}
                    centerText={"Messages"}
                    leftIcon={"arrowleft"}
                    leftIconCategory={"AntDesign"}
                    isNotRightThenWidth={"70%"}
                    goBack={this.goBack}
                 />
                 <View style={{flex:1,flexDirection:"column"}}>
                    <Portfolio 
                        horizontal={false}
                        portfolioData={data }
                        from="chat"
                    />
                 </View>
                       <View style={styles.tapToContinueButtonView}>
                            <TextInput onChangeText={(message)=>this.setState({message})} style={styles.input} /* numberOfLines={10} */ placeholderTextColor="#000000"   /* value="cvxcvxccvdvsdvsdv" */  placeholder="type..." />
                       <TouchableOpacity onPress={this.messageHandler}activeOpacity={.7}>
                           <Text style={styles.continueText}>Sent</Text>
                        </TouchableOpacity>
                       </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chat:state.chat
    }
  }
  const mapDispatchToProps = dispatch => 
      bindActionCreators(actions, dispatch);
  
  export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom)


  const styles=StyleSheet.create({
    tapToContinueButtonView:{
        marginTop:5,
        marginHorizontal:10,
        backgroundColor:"grey",
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:4,
        alignItems:'center',
        marginBottom:10,
    },
    continueText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"800",
    },
    messageView:{
        backgroundColor:"#000000",
        flex:1,
    },
    input:{
        color:"#000000",
        flex:.9,
        backgroundColor:"#ffffff",
        borderRadius:45,
        flexDirection:"row",
        alignSelf:"flex-start",
        flexWrap:"wrap",
        paddingLeft:10
    }
  })