import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, BackHandler,Animated,VirtualizedList } from 'react-native'
import Layout from "../helper/Layout";
import {Icon} from "native-base";
import { Container, Header, Content, Item, Input, Radio } from 'native-base';
import FormProducts from './FormProducts';
import FabricatorForm from './FabricatorForm';


export default class ExhibitorForm extends Component {
    constructor(props){
        super(props)
        this.state={scrollToIndex:0,
                    postion:new Animated.Value(-Layout.window.height),
                    isDropDown:false
                }
        
    }


    onDropDownPress=()=>{
        const {isDropDown} =this.state;
        if(!isDropDown){
           this.setState({isDropDown:!isDropDown})
          Animated.spring(this.state.postion,{
            toValue:0,
            duration:2000
          }).start()
        }
        else{
            this.setState({isDropDown:!isDropDown})
            Animated.spring(this.state.postion,{
                toValue:-Layout.window.height,
                duration:2000
              }).start()
        }
    }

    onChangeText=(value,name)=>{
        this.props.onTextChange(value,name)
    }

    onRadioButtonPress=(index,categoryIndex,item, selected)=>{
        this.props.onRadioButtonPress(index,categoryIndex,item, selected)
    }

    onChange=(index, categoryIndex,value,item,selected)=>{
        this.props.onChange(index, categoryIndex,value,item,selected)
    }

    _renderItem=({item,index})=>{
        const {isDropDown} =this.state;
        const {exhibitorDetail,products,extraDataForProducts,errors, furnitures, extraDataForFurnitures, brandings, extraDataForBrandings} =this.props;
        let cardText = index == 0 ? "Booth size" : index == 1 ? "Booth no" : index ==2 ? "Color theme" : index ==6 ?  "Carpet Color" :index == 5 ? "Products & services" : "Website Link"
        let name = index == 0 ? "stallSize" : index == 1 ? "stallNo" : index ==2 ? "colorTheme" : index == 6 ? "carpetColor" : index == 5 ? "ProductsNservices" : "websiteLink"
        return(
        <View key={index} style={styles.contentCard}>
            {(index ==0 || index ==1 || index ==2 || index ==6 || index ==7 || index == 5) &&
                    <View style={styles.inputView}>
                    <Text style={styles.stallText}>{cardText}</Text>
                    <Item >
                        <Input 
                            value={index == 0 ? exhibitorDetail.stallSize : index == 1 ? exhibitorDetail.stallNo : index ==2 ? exhibitorDetail.colorTheme : index ==6 ?  exhibitorDetail.carpetColor : index == 5 ? exhibitorDetail.ProductsNservices : exhibitorDetail.websiteLink}
                            style={styles.inputSize}
                            placeholder={index ==6 ? "Optional" : 'Type here..'}      
                            keyboardType={index ==1 ? "phone-pad" : "default"}
                            placeholderTextColor="#E6E5E2"
                            onChangeText={(value)=>this.onChangeText(value,name)}
                        />
                      
                    </Item>
                    {errors.error &&<View style={styles.errorView}>
                        <Text style={styles.errorText}>*{errors.error}</Text>
                    </View>}
                </View>}
               {(index ==3 || index ==4 ) &&
                <View style={styles.furnitureWrapper}>
                    <View style={styles.furnitureTextView}>
                         <Text style={styles.furnitureText}>{index ==3 ? "Branding" /* : index == 5 ? "Products/Services" */ : "Furniture"}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onDropDownPress}>
                        <View style={[styles.listIem,{marginTop:30}]}> 
                            <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}} >
                                <View style={styles.radioButton}>
                                    <Radio 
                                        color={"#000000"}
                                        selectedColor={"#5cb85c"}
                                        selected={isDropDown}
                                    />
                                    <Text style={styles.radioButtonText}>{index ==3 ? "Select Multiple Branding" :  index == 5 ? "Select Multiple Products/Services" : "Select Multiple Furniture"}</Text>
                                </View>
                            </View>
                            <View style={{}}>
                                <Icon
                                    type="Entypo"
                                    name={isDropDown ?  "chevron-small-up" : "chevron-small-down"}
                                    // style={styles.iconColor}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>
                     <View style={[styles.horizontalLinee,{marginBottom:10}]}></View>
                     <Animated.View style={{postion:"absolute",flex:1,top:this.state.postion}} >
                        <FormProducts 
                            item={index == 3 ? brandings : index == 5 ? products : furnitures }
                            extraDataFormProduct={index == 3 ? extraDataForBrandings : index == 5 ? extraDataForProducts : extraDataForFurnitures}
                            categoryIndex={index}
                            onRadioButtonPress={this.onRadioButtonPress}
                            onChange={this.onChange}
                        />
                     </Animated.View>
                </View>
             } 
             {index == 8 &&
                <FabricatorForm 
                    onTextChange={this.onChangeText}
                    exhibitorDetail={exhibitorDetail}
                    exhibitorForm={true}
                    errors={errors}
                    
                />
             }

        </View>
        )
    }

    _getItemCount=(data)=>{
        return 9
    }

    _getItemLayout=(data, index) => {
        return  { key: index };
    }

    render() {
        const {scrollToIndex} =this.props;
        return (
            <View style={styles.mainWrapper}>
                <VirtualizedList
                     ref={(ref) => { this.flatListRef = ref; }}
                    data={[1,2,3,4,5,6,7,8]}
                    renderItem={this._renderItem}
                    keyExtractor={(item,index)=>index.toString()}
                    initialNumToRender={1}
                    getItem={this._getItemLayout}
                    windowSize={21}
                    maxToRenderPerBatch={1}
                    horizontal={true }
                    getItemCount={this._getItemCount}
                    onEndReached={()=>{console.log("onEndReached")}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
                <View style={styles.horizontalLine}/>
                <TouchableOpacity onPress={()=>this.props.scrollToIndexHandler(scrollToIndex,  scrollToIndex+1,9,this.flatListRef)} activeOpacity={.7}>
                    <View style={styles.tapToContinueButtonView}>
                            <Text style={styles.continueText}>Continue</Text>
                            <Icon
                                type="AntDesign"
                                name="arrowright"
                                style={styles.iconColor}
                            />
                        </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper:{
        flex:1,
        backgroundColor:"#ffffff"
    },
    contentCard:{
        flex:1,
        width:"100%",
        width:Layout.window.width,
        // borderWidth:1,
    },
    tapToContinueButtonView:{
        marginTop:5,
        marginHorizontal:10,
        backgroundColor:"#000000",
        padding:15,
        flexDirection:'row',
        justifyContent:"flex-end",
        borderRadius:4,
        alignItems:'center'
    },
    continueText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"800",
        marginRight:10
    },
    horizontalLine:{
        width:"100%",
        borderTopWidth:1,
        borderTopColor:"#D7DBDD"
    },
    inputView:{
        paddingHorizontal:10,
        flex:1,
        flexDirection:'column',
        justifyContent:"flex-start",
        alignItems:"center",
        marginTop:40
    },
    inputSize:{
        borderWidth:1,
        borderColor:"#D7DBDD",
        borderRadius:4
    },
    iconColor:{
        color:"#ffffff"
    },
    stallText:{
        fontSize:24,
        fontWeight:"bold",
        color:"#000000",
        marginBottom:40
    },
    furnitureWrapper :{
        flex:1
    },
    furnitureTextView:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center'
    },
    furnitureText:{
        fontSize:24,
        fontWeight:"bold",
        color:"#000000",
        marginTop:20
    },
    listIem:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:20,
    },
    radioButton:{
        flexDirection:"row"
    },
    radioButtonText:{
        marginLeft:5,
        color:"#000000"
    },
    inputSizee:{
        borderWidth:1,
        borderColor:"#D7DBDD",
        borderRadius:4,
        padding:0,
        height:20,
        fontSize:15,
        color:"#000000",
    },
    horizontalLinee:{
        borderBottomWidth:1,
       width:"95%",
       flexDirection:"row",
       alignSelf:"flex-end",
       borderBottomColor:"#D7DBDD",
       marginTop:5
    },
    errorView:{
        flexDirection:'row',
        justifyContent:"flex-start",
        alignSelf:"flex-start",
        marginTop:5
    },
    errorText:{
        fontSize:15,
        color:"red"
    }
})