import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text, BackHandler, } from 'react-native';
import Header from "../generic/Header";
import ExhibitorForm from "../components/ExhibitorForm";
import FabricatorForm from "../components/FabricatorForm";
import { connect } from 'react-redux';
import validate from "../helper/validation";
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import {setItem} from "../helper/storage";

 class WorkerForm extends React.Component {
    static navigationOptions = {
        header: null
      };
  state = {
    index: 0,
    scrollToIndex:0,
    flatListRefState :'',
    errors:{},
    products:[],
    extraDataForProducts:[],
    furnitures:[],
    extraDataForFurnitures:[],
    brandings:[],
    extraDataForBrandings:[],
    exhibitorBranding:[],
    exhibitorFurniture:[],
    exhibitorProducts:[], 
    exhibitorDetail:{
                      stallSize:'',
                      stallNo:'',
                      colorTheme:'',
                      carpetColor:'',
                      websiteLink:'',
                      name:'',
                      mobileNo:'',
                      email:'',
                      aboutYourSelf:''
                    }
  };

  goBack=()=>{
    this.props.navigation.goBack();
    this.setState({errors:{}})
  }
  
  goToFabricatorProfile=()=>{
    this.props.navigation.navigate("FabricatorProfile")
  }

  scrollToIndexHandler = (mainIndex, index,length,flatListRef) => {
     let errors = {}
     const {exhibitorDetail} = this.state;
     if(mainIndex == 0){
       errors = validate(exhibitorDetail.stallSize,"stallSize")
      this.setState({errors})
     }
     else if(mainIndex == 1){
      errors = validate(exhibitorDetail.stallNo,"stallNo")
     this.setState({errors})
    }
    else if(mainIndex == 2){
      errors = validate(exhibitorDetail.colorTheme,"colorTheme")
     this.setState({errors})
    }
    else if(mainIndex == 6){
      errors = validate(exhibitorDetail.carpetColor,"carpetColor")
     this.setState({errors})
    }else if(mainIndex == 8){
      errors = validate(exhibitorDetail,"fromValidation")
      this.setState({errors})
    }

     if(!Object.keys(errors).length){
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
        if(scrollToIndex == 8 ){
            const payload={
              email :exhibitorDetail.email ,
              password : "test",
              role: "exhibitor",
              name: exhibitorDetail.name,
              bio: exhibitorDetail.aboutYourSelf,
              phone: `+91${exhibitorDetail.mobileNo}`,
            }
            this.props.userRegistrationRequest(payload);
        }
     }
  } 

  componentDidMount() {
    const {products} = this.props.productList;
    if(products && products.products && products.products.length ){
      this.setState({products:products.products,extraDataForProducts:products.products,
                  furnitures:products.furnitures,extraDataForFurnitures:products.furnitures,
                  brandings:products.brandings,extraDataForBrandings:products.brandings
      })
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidUpdate(preProps){
    const {user} =this.props
    console.log(user,'useruseruseruseruser');
    
    const { exhibitorDetail, exhibitorBranding,exhibitorFurniture,exhibitorProducts} =this.state;
    if(user.isSuccess !== preProps.user.isSuccess){
      
      setItem("userInfo", JSON.stringify({token:user.data.token}));
      const payload = {
        size : exhibitorDetail.stallSize,
        stall_no:exhibitorDetail.stallNo ,
        color_theme : exhibitorDetail.colorTheme,
        carpet: exhibitorDetail.carpetColor,
        products:exhibitorProducts ,
        brandings: exhibitorBranding,
        furnitures: exhibitorFurniture,
        website_link: exhibitorDetail.websiteLink
      }
      this.props.createExhibitionRequest({data:payload,userToken:user.data.token,exhibitionToken:this.props.navigation.state.params.id})
    }
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

  onRadioButtonPress=(index,categoryIndex,item, selected)=>{
        if(categoryIndex == 3){
            let  extraDataForBrandings =  Object.assign({}, this.state.extraDataForBrandings);
            extraDataForBrandings[index].selected = !extraDataForBrandings[index].selected
            this.setState({extraDataForBrandings})
            if(selected){
              let exhibitorBranding=this.state.exhibitorBranding
              exhibitorBranding.push(item)
              this.setState({exhibitorBranding})
            }else{
              let exhibitorBranding = this.state.exhibitorBranding.filter((list,i)=>item.id !==list.id)
              this.setState({exhibitorBranding})
            }
        }
        else if(categoryIndex == 4){
          let  extraDataForFurnitures =  Object.assign({}, this.state.extraDataForFurnitures);
          extraDataForFurnitures[index].selected = !extraDataForFurnitures[index].selected
          this.setState({extraDataForFurnitures})
          if(selected){
            let exhibitorFurniture=this.state.exhibitorFurniture
            exhibitorFurniture.push(item)
            this.setState({exhibitorFurniture})
          }else{
            let exhibitorFurniture = this.state.exhibitorFurniture.filter((list,i)=>item.id !==list.id)
            this.setState({exhibitorFurniture})
          }
        }
        else if(categoryIndex == 5){
            let  extraDataForProducts =  Object.assign({}, this.state.extraDataForProducts);
            extraDataForProducts[index].selected = !extraDataForProducts[index].selected
            this.setState({extraDataForProducts})
            if(selected){
              let exhibitorProducts=this.state.exhibitorProducts
              exhibitorProducts.push(item)
              this.setState({exhibitorProducts})
            }else{
              let exhibitorProducts = this.state.exhibitorProducts.filter((list,i)=>item.id !==list.id)
              this.setState({exhibitorProducts})
            }
        }
  }
 
  render() {
    const {index,
      scrollToIndex,
      exhibitorDetail,
      products,
      extraDataForProducts,
      furnitures,
      extraDataForFurnitures,
      brandings,
      extraDataForBrandings,
      errors
    } =this.state;
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
          onRadioButtonPress={this.onRadioButtonPress}
          products={products}
          extraDataForProducts={extraDataForProducts}
          furnitures={furnitures}
          extraDataForFurnitures={extraDataForFurnitures}
          brandings={brandings}
          extraDataForBrandings={extraDataForBrandings}
          errors={errors}
        />
      }{index ==1 &&
        <FabricatorForm
          goToFabricatorProfile={this.goToFabricatorProfile}
          onTextChange={this.onTextChange}
          exhibitorDetail={exhibitorDetail}
          errors={errors}
        />
      }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList:state.productNexhibition.product,
    user:state.user.user
  }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(WorkerForm)

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
