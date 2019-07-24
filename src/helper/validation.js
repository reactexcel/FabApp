validate = values => {  
    const errors = {};
    if (!values.from) {
      errors.from = "Cannot be Empty";
    }
  
    if (!values.sender_mail) {
      errors.sender_mail = "Cannot be Empty";
    } else if (!isEmail(values.sender_mail) || !isLowercase(values.sender_mail)) {
      errors.sender_mail = "Enter a valid email and must be in lowercase";
    }
    if (!values.gender) errors.gender = "Select a gender";
    if (!values.mobile_no) {
      errors.mobile_no = "Cannot be Empty";
    } else if (!isMobilePhone(values.mobile_no, "en-IN")) {
      errors.mobile_no = "Enter valid phone number";
    }
    return errors;
  };