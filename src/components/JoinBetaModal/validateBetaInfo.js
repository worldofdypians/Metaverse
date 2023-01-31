export default function validateBetaInfo(values) {
    let errors = {};
  
    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email Address is Invalid";
    }
    if (!values.discord.trim()) {
      errors.discord = "Discord username is Required";
    } else if (!/^.{3,32}#[0-9]{4}$/i.test(values.discord)) {
      errors.discord = "Discord username is Invalid";
    }

    if(!values)
    return errors;
  }
  