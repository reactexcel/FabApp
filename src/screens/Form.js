import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Text, BackHandler, StatusBar,ActivityIndicator,Platform,ToastAndroid} from 'react-native';
import Header from "../generic/Header";
import ExhibitorForm from "../components/ExhibitorForm";
import FabricatorForm from "../components/FabricatorForm";
import { connect } from 'react-redux';
import validate from "../helper/validation";
import { bindActionCreators } from "redux";
import * as actions from '../redux/actions';
import {setItem, getItem} from "../helper/storage";
import Layout from '../helper/Layout';
import ErrorLoader from "../generic/ErrorLoader";
import alert from "../helper/alert";

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
                    },
    userToken:"",
  };

  goBack=()=>{
    this.props.navigation.goBack();
    this.setState({errors:{}})
  }
  
  goToFabricatorProfile=()=>{
    this.props.navigation.navigate("FabricatorProfile")
  }

  scrollToIndexHandler = (mainIndex, index,length,flatListRef) => {
    const addQuote = this.props.navigation.state.params && this.props.navigation.state.params.addQuote
     let errors = {}
     const {exhibitorDetail,exhibitorBranding,exhibitorFurniture,exhibitorProducts,userToken} = this.state;
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
    else if(mainIndex == 3){
      errors = validate(exhibitorBranding,"brandings")
     this.setState({errors})
     alert(errors.error)
    }
    else if(mainIndex == 4){
      errors = validate(exhibitorFurniture,"furnitures")
     this.setState({errors})
     alert(errors.error)
    }
    else if(mainIndex == 5 ){
      errors = validate(exhibitorProducts, "products")
      alert(errors.error)
    }
    else if(mainIndex == 6){
      errors = validate(exhibitorDetail.carpetColor,"carpetColor")
     this.setState({errors})
    }else if(mainIndex == 7){
      errors = validate(exhibitorDetail.websiteLink,"websiteLink")
     this.setState({errors})
    }
    else if(mainIndex == 8){
      errors = validate(exhibitorDetail,"fromValidation")
      this.setState({errors})
    }

     if(!Object.keys(errors).length){
        const {scrollToIndex,flatListRefState} = this.state;
        if(!flatListRefState){
          this.setState({flatListRefState:flatListRef})
        }
        if(addQuote? length-1>index : length>index){
            flatListRef.scrollToIndex({animated: true, index:index});
        }
        if(addQuote? length-1>index : length > index){
            this.setState({scrollToIndex:scrollToIndex+1})
        }
        if(scrollToIndex == 5){
            this.quantityFilter()
        }
        if(scrollToIndex == 8 ){
          this.onSubmit();
        }
        if(addQuote && scrollToIndex == 7 ){
          // this.props.clearUserProfileRequest()
          this.addQuote(userToken.token);
        }
     }
  } 

  onSubmit=()=>{
    const{exhibitorDetail, index} =this.state;
    const payload={
      email :exhibitorDetail.email ,
      password : "test",
      role:index ==0 ? "exhibitor" : "fabricator",
      name: exhibitorDetail.name,
      bio: exhibitorDetail.aboutYourSelf,
      phone: `+91${exhibitorDetail.mobileNo}`,
      // website_link: `https://${exhibitorDetail.websiteLink}`
    }
    if(index == 1){
      let errors = validate(exhibitorDetail,"fromValidation")
      this.setState({errors})
      if(!Object.keys(errors).length){
        this.props.userRegistrationRequest(payload); 
     }
    }else{
      this.props.userRegistrationRequest(payload);
    }
  }

 async componentDidMount() {
    const userToken = await getItem("userInfo")
    this.setState({userToken})
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
    const {user,createExhibition} =this.props
    const addQuote = this.props.navigation.state.params && this.props.navigation.state.params.addQuote
    const { exhibitorDetail,index,userToken, exhibitorBranding,exhibitorFurniture,exhibitorProducts} =this.state;
    if(user.isSuccess !== preProps.user.isSuccess ){
      setItem("userInfo", JSON.stringify({token:user.data.token,role:index ==0 ? "exhibitor" : "fabricator"}));
      if( index ==0){
        this.addQuote(user.data.token);
      }
      else{
        this.props.navigation.navigate("FabricatorProfile",{navigatedFromForm:true})
      }
    }
    if(createExhibition.isSuccess !== preProps.createExhibition.isSuccess ){
      if(addQuote){
        this.props.userProfileRequest({userToken:userToken.token})
      }
      if(index == 0){
        this.props.navigation.navigate("Exhibitor")
      }
    }
    if(createExhibition.userProfile !== preProps.createExhibition.userProfile ){
      this.props.navigation.navigate("Exhibitor")
    }
  }

  addQuote=(token)=>{
    const { exhibitorDetail,index, exhibitorBranding,exhibitorFurniture,exhibitorProducts} =this.state;
    const payload = {
      size : exhibitorDetail.stallSize,
      stall_no:exhibitorDetail.stallNo ,
      color_theme : exhibitorDetail.colorTheme,
      carpet: exhibitorDetail.carpetColor,
      products: exhibitorProducts,
      brandings: exhibitorBranding,
      furnitures:exhibitorFurniture,
      website_link: `https://${exhibitorDetail.websiteLink}`
    }
   this.props.createExhibitionRequest({data:payload,userToken:token,exhibitionToken:this.props.navigation.state.params.id})
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

  clearState=()=>{
    
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
              exhibitorBranding.push({id:item.id, branding:item.branding,quantity:1})
              this.setState({exhibitorBranding})
            }else{
              delete extraDataForBrandings[index].quantity 
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
            exhibitorFurniture.push({id:item.id, furniture:item.furniture,quantity:1})
            this.setState({exhibitorFurniture})
          }else{
            delete extraDataForFurnitures[index].quantity
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
              exhibitorProducts.push({id:item.id, product:item.product,quantity:1})
              this.setState({exhibitorProducts})
            }else{
               delete extraDataForProducts[index].quantity
              let exhibitorProducts = this.state.exhibitorProducts.filter((list,i)=>item.id !==list.id)
              this.setState({exhibitorProducts})
            }
        }
  }

  quantityFilter=()=>{
    const {extraDataForBrandings,extraDataForFurnitures,extraDataForProducts,exhibitorBranding,exhibitorFurniture,exhibitorProducts } = this.state;
    const brand = Object.values(extraDataForBrandings).filter((item,i)=>item.quantity)
    const furniture = Object.values(extraDataForFurnitures).filter((item,i)=>item.quantity)
    const product = Object.values(extraDataForProducts).filter((item,i)=>item.quantity)
      let b = [], f =[], p =[]
       brand.forEach((element,index)=>{
        exhibitorBranding.forEach((list,index)=>{
          if(element.id === list.id){
              b.push({branding:element.branding,quantity:parseInt(element.quantity)})
          }
        })
       })
       furniture.forEach((element,index)=>{
        exhibitorFurniture.forEach((list,index)=>{
          if(element.id === list.id){
              f.push({ furniture:element.furniture,quantity:parseInt(element.quantity)})
          }
        })
       })
       product.forEach((element,index)=>{
        exhibitorProducts.forEach((list,index)=>{
          if(element.id === list.id){
              p.push({ product:element.product,quantity:parseInt(element.quantity)})
          }
        })
       })
       this.setState({exhibitorBranding:b,exhibitorFurniture:f,exhibitorProducts:p})
  }

  onChange=(index, categoryIndex,value,item,selected)=>{
    if(categoryIndex == 4){
      if(selected){
        let  extraDataForFurnitures =  Object.assign({}, this.state.extraDataForFurnitures);
          extraDataForFurnitures[index].quantity = value
          this.setState({extraDataForFurnitures,})
      }else{
        alert("Select item first!");
     }
      
    }
    else if(categoryIndex == 3){
        if(selected){
          let  extraDataForBrandings =  Object.assign({}, this.state.extraDataForBrandings);
           extraDataForBrandings[index].quantity = value;
          this.setState({extraDataForBrandings})
        }else{
           alert("Select item first!");
        }
    }
    else if(categoryIndex == 5){
      if(selected){
        let  extraDataForProducts =  Object.assign({}, this.state.extraDataForProducts);
        extraDataForProducts[index].quantity = value
          this.setState({extraDataForProducts})
      }else{
        alert("Select item first!");
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
      errors,
      exhibitorBranding,exhibitorFurniture,exhibitorProducts
    } =this.state;
    const { user,createExhibition,userProfile,fabList} =this.props;
    const addQuote = this.props.navigation.state.params && this.props.navigation.state.params.addQuote
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
        {(userProfile.isLoading || user.isLoading || createExhibition.isLoading) && <View style={{flexDirection:'column',justifyContent:"center",alignItems:"center",width:Layout.window.width,height:Layout.window.height-60-StatusBar.currentHeight,bottom:0,backgroundColor:"rgba(0,0,0,.4)",position:"absolute",zIndex:100000}}>
               <ActivityIndicator size="large" color="#ffffff" />
        </View>}
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
              onPress={addQuote ? ()=>null : () =>  this.setState({ index: 1,})}>
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
          onChange={this.onChange}
        />
      }{index ==1 &&
        <FabricatorForm
          onSubmit={this.onSubmit}
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
    user:state.user.user,
    createExhibition:state.user.createExhibition,
    userProfile:state.user.userProfile,
    fabList:state.productNexhibition.fabList,
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
