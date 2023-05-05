export default function validateInfo(values, interests) {
    let errors = {};
  
    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email Address is Invalid";
    }
    if (!values.name.trim()) {
      errors.name = "Name is Required";
    } 
   
    if (!values.description.trim()) {
      errors.description = "Description is Required";
    } 
    if (!interests.trim()) {
      errors.interests = "At least one field of interest is Required";
    } 

    return errors;
  }
  

