export default function validateEmail(email) {
    let errors = {}

    if(email === ""){
        errors.email = "Email address required"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
        errors.email = "Email Address is invalid"
    }
    
    return errors;
}