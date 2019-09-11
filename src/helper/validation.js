export default validate = (values,step) => { 
    const errors = {};
    //validation during creating quote 
    if (!values && step === "stallSize" ) {
      errors.error = "Enter your stall size that you want";
    }else if((values == "0" || values == "00" || values == "000" || values == "0000" || values == "00000") &&  step === "stallSize"){
      errors.error = "Enter a valid stall no";
    }
    if (!values &&  step === "stallNo") {
      errors.error = "Enter your stallno that you want";
    }else if((values == "0" || values == "00" || values == "000" || values == "0000" || values == "00000") &&  step === "stallNo"){
      errors.error = "Enter a valid stall no";
    }
    if (!values.length>0 && step === "products") {
      errors.error = "*choose products";
    }
    if (!values.length>0 && step === "furnitures") {
      errors.error = "*choose furnitures";
    }
    if (!values.length>0 && step === "brandings") {
      errors.error = "*choose brandings";
    }

    if (!values && step === "colorTheme") {
      errors.error = "Set your stall color them";
    }
    if (!values && step === "carpetColor") {
      errors.error = "Set your stall's carpet color ";
    }
    if (!values && step === "websiteLink") {
      errors.error = "Enter your website link";
    }

    //validation during registation
    if(step === "fromValidation"){
      if (!values.name) {
        errors.name = "Enter your name";
      }
      if (!values.mobileNo) {
        errors.mobileNo = "Enter your mobile number";
      }
      else if(values.mobileNo.length < 10){
        errors.mobileNo = "Invalid mobile number";
      }

      if (!values.email) {
        errors.email = "Enter your email id ";
      }
      if (!values.aboutYourSelf) {
        errors.aboutYourSelf = "Tell us something about you";
      }else if(values.aboutYourSelf.length < 50){
        errors.aboutYourSelf = "About you is too short to know you";
      }
  }

  //validation during update profile

  if( step === "duringUpdate"){
    if (!values.aboutYourSelf) {
      errors.aboutYourSelf = "Tell us something about you";
    }else if(values.aboutYourSelf.length < 50){
      errors.aboutYourSelf = "About you is too short to know you";
    }

    if (!values.mobileNumber) {
      errors.mobileNumber = "Enter your mobile number";
    }
    else if(values.mobileNumber.length < 10){
      errors.mobileNumber = "Invalid mobile number";
    }

    if (!values.websiteLink) {
      errors.websiteLink = "Enter your website link";
    }
  }

  //validation during login
  if( step === "auth"){
    if (!values.email) {
      errors.email = "Enter your email id ";
    }
    if (!values.password) {
      errors.password = "Enter your password ";
    }/* else if(values.password.length < 8){
      errors.password = "Password must be of 8 characters long";
    } */
  }
    


    

    return errors;
  };