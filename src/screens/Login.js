import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from "../generic/Header";
import {Item, Input, Label} from "native-base";
import SplashScreen from 'react-native-splash-screen'
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import ErrorLoader from "../generic/ErrorLoader";
import validate from "../helper/validation";
import alert from "../helper/alert";
import {setItem, getItem} from "../helper/storage";
import firebase from 'react-native-firebase';

 class Login extends Component {
    static navigationOptions = {
        header: null
      };
      constructor(props){
          super(props);
          this.state={
                email:"",
                password:"",
                errors:{},
                fcm_token:""
            }
      }

  async componentDidMount(){
        SplashScreen.hide();
        const fcm_token = await firebase.messaging().getToken();
        this.setState({fcm_token})
    }
      
    componentDidUpdate(props){
        const {userLogin} = this.props;
        if(userLogin.isError !== props.userLogin.isError){
            if(userLogin.isError){
                alert(userLogin.data ? userLogin.data : "Error");
            }
        }

        if(userLogin.isSuccess !== props.userLogin.isSuccess){
            if(userLogin.isSuccess){
                setItem("userInfo", JSON.stringify({token:userLogin.data.token,role:userLogin.data.role}));
                this.props.navigation.navigate(userLogin.data.role ==="fabricator" ? "FabricatorProfile":"Exhibitor",{navigatedFromForm:true})
            }
        }
    }

    goBack=()=>{
        this.props.navigation.goBack()
   }

   loginHandler=()=>{
    const {email, password,fcm_token} = this.state;
    const errors = validate({email,password}, "auth")
    this.setState({errors})
    if(!Object.keys(errors).length){
        const payload = {email, password, fcm_token}
        this.props.userLoginRequest(payload)
    }
   }

    render() {
        const { email, password, errors } = this.state
        const { userLogin} = this.props
        return (
            <View style={{flex:1}}>
                 <Header
                    goBack={this.goBack}
                    isLeft={true}
                    leftIcon={"arrowleft"}
                    leftIconCategory={"AntDesign"}
                    isNotRightThenWidth={"64%"}
                    isCenter={true}
                    centerText={"Login"}
                />
                {userLogin.data ==="Network Error" ?
                <ErrorLoader handlerData={userLogin}/> :
                <>
                    <ScrollView >
                        <View style={styles.wrapper}>
                            {/* <Text style={styles.headerTest}>FabApp</Text> */}
                            <View style={styles.form}>
                                <View style={styles.itemWrapper}>
                                <Item style={styles.item} stackedLabel>
                                <Label>Username or Email</Label>
                                    <Input 
                                    style ={styles.inputBox}
                                        value={email}
                                        placeholder={'Type here...'}      
                                        placeholderTextColor="#E6E5E2"
                                        onChangeText={(email)=>this.setState({email})}
                                    />
                                </Item >
                                </View>
                                {errors.email && <Text style={[styles.errorText,{marginBottom:20}]} >{errors.email}</Text>}
                                <View style={styles.itemWrapper}>
                                <Item style={styles.item} stackedLabel>
                                <Label>Password</Label>
                                    <Input 
                                        value={password}
                                        style={styles.inputBox}
                                        placeholder={'Type here...'}      
                                        placeholderTextColor="#E6E5E2"
                                        onChangeText={(password)=>this.setState({password})}
                                    />
                                </Item>
                                </View>
                                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={this.loginHandler} activeOpacity={.7}>
                            <View style={styles.tapToContinueButtonView}>
                                <Text style={styles.continueText}>Login</Text>
                            </View>
                    </TouchableOpacity>
                 </>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin:state.auth.userLogin
    }
  }
  const mapDispatchToProps = dispatch => 
      bindActionCreators(actions, dispatch);
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login)


const styles = StyleSheet.create({
    headerTest:{
        fontSize:20,
        color : "#000000",
        alignSelf:"center"
    },
    item:{
        borderBottomColor:"transparent",
    },
    wrapper:{
        paddingHorizontal:10,
        paddingTop:20
    },
    form:{
        marginTop:100
    },
    itemWrapper:{
        borderWidth:1,
        marginBottom:5,
        borderRadius:4,
        paddingHorizontal:4,
        borderColor:"#bfb6b6",
    },
    tapToContinueButtonView:{
        marginTop:5,
        marginHorizontal:10,
        backgroundColor:"#000000",
        padding:15,
        flexDirection:'row',
        justifyContent:"center",
        borderRadius:4,
        alignItems:'center',
        marginBottom:10
    },
    continueText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"800",
        marginRight:10
    },
    inputBox:{
        marginTop:-8,
    },
    errorText:{
        color:"red"
    }
})