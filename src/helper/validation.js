export default validate = (values,step) => { 
    const errors = {};
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
    if (!values && step === "colorTheme") {
      errors.error = "Set your stall color them";
    }
    if (!values && step === "carpetColor") {
      errors.error = "Set your stall's carpet color ";
    }
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
    


    

    return errors;
  };