export default function validateInfo(values, interests) {
  let errors = {};

  if (!values.land.trim()) {
    errors.land = "Land ID is Required";
  } else if (/^[0-9]$/.test(values.land)) {
    errors.land = "Land ID is Invalid";
  }

  return errors;
}
