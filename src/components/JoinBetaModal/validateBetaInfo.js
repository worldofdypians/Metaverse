export default function validateBetaInfo(values) {
    let errors = {};
  
    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email Address is Invalid";
    }
    if (!values.discord.trim()) {
      errors.discord = "Discord username is Required";
    }

    if(!values)
    return errors;
  }
  