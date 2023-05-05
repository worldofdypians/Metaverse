export  function validateBusinessInfo(values) {
    let errors = {};
  
    if (!values.business_email) {
      errors.business_email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.business_email)) {
      errors.business_email = "Email Address is Invalid";
    }
    if (!values.business_name.trim()) {
      errors.business_name = "Name is Required";
    } 
   
    if (!values.business_description.trim()) {
      errors.business_description = "Description is Required";
    } 

    if (!values.business_job_title.trim()) {
      errors.business_job_title = "Job title is Required";
    } 

    if (!values.business_organization.trim()) {
      errors.business_organization = "Organization is Required";
    } 

    if (!values.business_subject.trim()) {
      errors.business_subject = "Subject is Required";
    } 


    return errors;
  }
  