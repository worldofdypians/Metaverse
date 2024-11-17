import React from "react";
import "./_partnerform.scss";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import styled from "styled-components";
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import uploadIcon from "./assets/uploadIcon.svg";
import uploadedIcon from "./assets/uploadedIcon.svg";
import xMark from "./assets/xMark.svg";
import ReCaptchaV2 from "react-google-recaptcha";
import { useRef } from "react";
import validateInfo from "./validateInfo";
import { validateBusinessInfo } from "./validateBusinessInfo";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import modalClose from "../../assets/newsAssets/modalClose.svg";
import newsLetterModal from "../../assets/newsAssets/newsLetterModal.svg";
import selectBtn from "./assets/selectBtn.svg";
import FormContainer from "../../components/FormContainer/FormContainer";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#272450",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const PartnerForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact us";
  }, []);

  const initialValues = {
    name: "",
    email: "",
    company_name: "",
    company_size: "",
    description: "",
    interests: "",
  };

  const businessInitialValues = {
    business_name: "",
    business_job_title: "",
    business_organization: "",
    business_email: "",
    business_subject: "",
    business_description: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [businessValues, setbusinessValues] = useState(businessInitialValues);
  const [businessErrors, setbusinessErrors] = useState({});
  const [openBusiness, setopenBusiness] = useState(false);
  const [openBuild, setopenBuild] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [businessSelectedFile, setbusinessSelectedFile] = useState(null);

  const recaptchaRef = useRef(null);
  const businessrecaptchaRef = useRef(null);

  const [success, setSuccess] = useState(false);
  const [businessSuccess, setbusinessSuccess] = useState(false);

  const [enableSubmit, setEnableSubmit] = useState(false);
  const [businessEnableSubmit, setbusinessEnableSubmit] = useState(false);

  const [testArray, setTestArray] = useState([]);
  const [formState, setFormState] = useState({
    job: false,
    subject: false,
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBusinessChange = async (e) => {
    const { name, value } = e.target;

    setbusinessValues({
      ...businessValues,
      [name]: value,
    });
  };

  const addProducts = (product) => {
    if (testArray.includes(product)) {
      const index = testArray.indexOf(product);
      testArray.splice(index, 1);
    } else {
      setTestArray([...testArray, product]);
    }
  };

  const onBusinessFileChange = (event) => {
    const fileTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    const file = event.target.files[0];
    const reader = new FileReader();
    const testImage = new Image();

    reader.onload = function () {
      if (reader !== null && typeof reader.result == "string") {
        testImage.src = reader.result;
      }
    };
    reader.readAsDataURL(file);

    testImage.onload = async function () {
      if (fileTypes.includes(event.target.files[0].type)) {
        if (event.target.files && event.target.files[0]) {
          if (event.target.files[0].size < 5000000) {
            setbusinessSelectedFile(reader.result);
          } else alert("File size too big");
        }
      } else {
        alert("Image type not supported");
      }
    };
  };

  const handleBusinessChangeBg = (event) => {
    if (businessSelectedFile) {
      setbusinessSelectedFile(null);
      event.preventDefault();
    }
  };

  const onFileChange = (event) => {
    const fileTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    const file = event.target.files[0];
    const reader = new FileReader();
    const testImage = new Image();

    reader.onload = function () {
      if (reader !== null && typeof reader.result == "string") {
        testImage.src = reader.result;
      }
    };
    reader.readAsDataURL(file);

    testImage.onload = async function () {
      if (fileTypes.includes(event.target.files[0].type)) {
        if (event.target.files && event.target.files[0]) {
          if (event.target.files[0].size < 5000000) {
            setSelectedFile(reader.result);
          } else alert("File size too big");
        }
      } else {
        alert("Image type not supported");
      }
    };
  };

  const handleChangeBg = (event) => {
    if (selectedFile) {
      setSelectedFile(null);
      event.preventDefault();
    }
  };

  const handleBusinessSubmit = async (e) => {
    e.preventDefault();

    setbusinessErrors(validateBusinessInfo(businessValues));

    if (Object.keys(validateBusinessInfo(businessValues)).length === 0) {
      const captchaToken = await businessrecaptchaRef.current.executeAsync();
      const data = {
        name: businessValues.business_name,
        organization: businessValues.business_organization,
        job: businessValues.business_job_title,
        email: businessValues.business_email,
        subject: businessValues.business_subject,
        description: businessValues.business_description,
        recaptcha: captchaToken,
        file: businessSelectedFile,
      };

      if (
        businessValues.business_name !== "" &&
        businessValues.business_description !== "" &&
        businessValues.business_job_title !== "" &&
        businessValues.business_email !== "" &&
        businessValues.business_organization !== "" &&
        businessValues.business_subject !== ""
      ) {
        const send = await axios
          .post("https://api-mail.dyp.finance/api/business_form2", data)
          .then(function (result) {
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });
        if (send.status === 1) {
          setbusinessSuccess(true);
        } else {
          setbusinessSuccess(false);
        }
      } else {
      }
      businessrecaptchaRef.current.reset();
      setbusinessValues({ ...businessInitialValues });
      setbusinessSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validateInfo(values, testArray.join()));

    if (Object.keys(validateInfo(values, testArray.join())).length === 0) {
      const captchaToken = await recaptchaRef.current.executeAsync();
      const data = {
        email: values.email,
        name: values.name,
        company_name: values.company_name,
        company_size: values.company_size,
        description: values.description,
        interests: testArray.join(),
        file: selectedFile,
        recaptcha: captchaToken,
      };

      if (
        values.name !== "" &&
        values.description !== "" &&
        data.interests !== "" &&
        values.email !== ""
      ) {
        const send = await axios
          .post("https://api-mail.dyp.finance/api/wod/business", data)
          .then(function (result) {
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });
        if (send.status === 1) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } else {
      }
      recaptchaRef.current.reset();
      setValues({ ...initialValues });
      setSelectedFile(null);
    }
  };

  return (
    <div className="container-fluid d-flex pt-5 px-3 px-lg-0 align-items-center my-5 justify-content-center">
      <div className="partner-main-wrapper py-5 w-100 d-flex align-items-center flex-column gap-4">
        <div className="d-flex flex-column mb-4">
          <h6 className="partner-title font-organetto d-flex gap-3 justify-content-center">Contact <h6 className="partner-title font-organetto" style={{color: 'rgb(140, 86, 255)'}}>Us</h6></h6>
           <p className="partner-desc w-100">
          Reach out to us anytime and we will happily answer all of your
          inquiries.
        </p>
        </div>
       
        <div className=" col-12 mx-0 row gap-5 justify-content-around">
          <FormContainer
            title="General Inquiry"
            desc="Get immediate help and support for your inquiries."
            accordionState={true}
            // collapse="collapseHelp"
            emailLink="mailto:helpcenter@dypius.com"
            email="helpcenter@dypius.com"
            // image="business"
            onClick={() => {
              setopenBusiness(true);
            }}
          >
            <div
              // id="collapseHelp"
              className="accordion-collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div
                className="gap-3 p-lg-3 d-flex flex-column"
                style={{ height: "fit-content" }}
              >
                <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row align-items-center justify-content-between gap-3">
                  <StyledTextField
                    error={businessErrors.business_name ? true : false}
                    size="small"
                    label="Name"
                    id="business_name"
                    name="business_name"
                    value={businessValues.business_name}
                    helperText={businessErrors.business_name}
                    required
                    onChange={(e) => {
                      handleBusinessChange(e);
                    }}
                    sx={{ width: "100%" }}
                  />

                  <StyledTextField
                    error={businessErrors.business_job_title ? true : false}
                    size="small"
                    label="Job Title"
                    id="business_job_title"
                    name="business_job_title"
                    required
                    value={businessValues.business_job_title}
                    helperText={businessErrors.business_job_title}
                    onChange={(e) => {
                      handleBusinessChange(e);
                    }}
                    sx={{ width: "100%" }}
                  />
                </div>

                <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row align-items-center justify-content-between gap-3">
                  <StyledTextField
                    error={businessErrors.business_organization ? true : false}
                    size="small"
                    label="Organization"
                    id="business_organization"
                    name="business_organization"
                    value={businessValues.business_organization}
                    helperText={businessErrors.business_organization}
                    required
                    onChange={(e) => {
                      handleBusinessChange(e);
                    }}
                    sx={{ width: "100%" }}
                  />

                  <StyledTextField
                    error={businessErrors.business_email ? true : false}
                    size="small"
                    label="Email address"
                    id="business_email"
                    name="business_email"
                    value={businessValues.business_email}
                    helperText={businessErrors.business_email}
                    required
                    onChange={(e) => {
                      handleBusinessChange(e);
                    }}
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="d-flex flex-lg-row flex-xl-row flex-column m-0 justify-content-between gap-4">
                  {formState.subject === false ? (
                    <FormControl fullWidth className="w-100">
                      <StyledTextField
                        sx={{ borderRadius: "8px", fontFamily: "Poppins" }}
                        labelId="demo-simple-select-error-label"
                        id="business_subject"
                        name="business_subject"
                        select
                        size="small"
                        value={businessValues.business_subject}
                        error={businessErrors.business_subject ? true : false}
                        onChange={handleBusinessChange}
                        renderValue={(value) => value}
                        label="Subject"
                        required
                      >
                        <MenuItem
                          sx={{
                            background: "#080b2a",
                            color: "#AAA5EB",
                            fontFamily: "Poppins",
                          }}
                          value="Partnership"
                        >
                          Partnership
                        </MenuItem>
                        <MenuItem
                          sx={{
                            background: "#080b2a",
                            color: "#AAA5EB",
                            fontFamily: "Poppins",
                          }}
                          value="Media Inquiry"
                        >
                          Media Inquiry
                        </MenuItem>
                        <MenuItem
                          sx={{
                            background: "#080b2a",
                            color: "#AAA5EB",
                            fontFamily: "Poppins",
                          }}
                          onClick={() =>
                            setFormState({ ...formState, subject: true })
                          }
                          value=""
                        >
                          Other
                        </MenuItem>
                      </StyledTextField>
                      <FormHelperText style={{ color: "#d32f2f" }}>
                        {businessErrors.business_subject}
                      </FormHelperText>
                    </FormControl>
                  ) : (
                    <div className="selected-field d-flex justify-content-center align-items-center gap-2 px-0 w-100">
                      <StyledTextField
                        error={businessErrors.business_subject ? true : false}
                        required
                        size="small"
                        label="Subject"
                        name="business_subject"
                        id="business_subject"
                        value={businessValues.business_subject}
                        onChange={handleBusinessChange}
                        helperText={businessErrors.business_subject}
                        sx={{ width: "100%" }}
                      />
                      <img
                        src={selectBtn}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setFormState({ ...formState, subject: false })
                        }
                      />
                    </div>
                  )}
                </div>

                <StyledTextField
                  error={businessErrors.business_description ? true : false}
                  size="small"
                  label="Please describe your inquiry*"
                  id="business_description"
                  name="business_description"
                  value={businessValues.business_description}
                  helperText={businessErrors.business_description}
                  multiline
                  rows={4}
                  onChange={(e) => {
                    handleBusinessChange(e);
                  }}
                  sx={{ width: "100%" }}
                />

                <hr className="partner-divider" />
                <div className="d-flex align-items-center gap-2">
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#00FECF",
                      },
                    }}
                    onChange={() =>
                      setbusinessEnableSubmit(!businessEnableSubmit)
                    }
                  />
                  <span className="checkbox-title">
                    I agree to share my email address with Dypius for use in
                    accordance with the World of Dypians privacy policy,
                    including to receive communications.
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  {businessSelectedFile ? (
                    <div className="d-flex align-items-center gap-2">
                      <div className="upload-btn-wrapper">
                        <button className="btn upload-btn d-flex align-items-center gap-2">
                          <img src={uploadedIcon} alt="" />
                          File added
                        </button>
                      </div>
                      <img
                        src={xMark}
                        alt="x mark"
                        onClick={handleBusinessChangeBg}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ) : (
                    <div className="upload-btn-wrapper">
                      <button className="btn upload-btn d-flex align-items-center gap-2">
                        <input
                          type="file"
                          style={{
                            opacity: "0",
                            position: "absolute",
                            cursor: "pointer",
                            width: "100px",
                          }}
                          className="p-2"
                          onChange={(e) => onBusinessFileChange(e)}
                        />
                        Upload File
                        <img src={uploadIcon} alt="" />
                      </button>
                    </div>
                  )}
                  <div
                    className={`${
                      businessEnableSubmit
                        ? "linear-border"
                        : "linear-border-disabled"
                    }`}
                  >
                    <button
                      className="btn filled-btn px-5 d-flex align-items-center gap-2"
                      onClick={handleBusinessSubmit}
                      disabled={!businessEnableSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <ReCaptchaV2
                  sitekey="6LflZgEgAAAAAO-psvqdoreRgcDdtkQUmYXoHuy2"
                  style={{ display: "inline-block" }}
                  theme="dark"
                  size="invisible"
                  ref={businessrecaptchaRef}
                />
              </div>
            </div>
          </FormContainer>
          {/* <FormContainer
            title="Build with us"
            desc="Express your creativity and make a mark on the virtual world."
            onClick={() => {
              setopenBuild(!openBuild);
            }}
            accordionState={openBuild}
            collapse="collapseHelp2"
            emailLink="mailto:helpcenter@dypius.com"
            email="helpcenter@dypius.com"
            image="injquiry"
          >
            <div
              id="collapseHelp2"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="partner-form-wrapper gap-3 p-lg-3 d-flex flex-column">
                <h6 className="partner-form-title font-organetto">
                  Start creating your{" "}
                  <span
                    className="partner-form-title"
                    style={{ color: "rgba(140, 86, 255, 1)" }}
                  >
                    own world
                  </span>
                </h6>
                <StyledTextField
                  error={errors.name ? true : false}
                  size="small"
                  label="Contact name"
                  id="name"
                  name="name"
                  value={values.name}
                  helperText={errors.name}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  sx={{ width: "100%" }}
                />
                <StyledTextField
                  error={errors.email ? true : false}
                  size="small"
                  label="Email address"
                  id="email"
                  name="email"
                  value={values.email}
                  helperText={errors.email}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  sx={{ width: "100%" }}
                />
                <div className="d-flex flex-lg-row flex-xl-row flex-column  align-items-center justify-content-between gap-3">
                  <StyledTextField
                    error={errors.company_name ? true : false}
                    size="small"
                    label="Company name"
                    id="company_name"
                    name="company_name"
                    value={values.company_name}
                    helperText={errors.company_name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    sx={{ width: "100%" }}
                  />

                  <StyledTextField
                    error={errors.company_size ? true : false}
                    size="small"
                    label="Company size"
                    id="company_size"
                    name="company_size"
                    value={values.company_size}
                    helperText={errors.company_size}
                    select
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    sx={{ width: "100%" }}
                  >
                    <MenuItem
                      sx={{
                        background: "#080b2a",
                        color: "#AAA5EB",
                        fontFamily: "Poppins",
                      }}
                      value={"Self-Employed"}
                    >
                      Ten
                    </MenuItem>
                    <MenuItem
                      sx={{
                        background: "#080b2a",
                        color: "#AAA5EB",
                        fontFamily: "Poppins",
                      }}
                      value={"1 - 10 Employees"}
                    >
                      1 - 10 Employees
                    </MenuItem>
                    <MenuItem
                      sx={{
                        background: "#080b2a",
                        color: "#AAA5EB",
                        fontFamily: "Poppins",
                      }}
                      value={"11 - 100 Employees"}
                    >
                      11 - 100 Employees
                    </MenuItem>
                    <MenuItem
                      sx={{
                        background: "#080b2a",
                        color: "#AAA5EB",
                        fontFamily: "Poppins",
                      }}
                      value={"101 - 999 Employees"}
                    >
                      101 - 999 Employees
                    </MenuItem>
                    <MenuItem
                      sx={{
                        background: "#080b2a",
                        color: "#AAA5EB",
                        fontFamily: "Poppins",
                      }}
                      value={"1,000 - 10,000 Employees"}
                    >
                      1,000 - 10,000 Employees
                    </MenuItem>
                    <MenuItem
                      sx={{
                        background: "#080b2a",
                        color: "#AAA5EB",
                        fontFamily: "Poppins",
                      }}
                      value={"10,000+ Employees"}
                    >
                      10,000+ Employees
                    </MenuItem>
                  </StyledTextField>
                </div>
                <StyledTextField
                  error={errors.description ? true : false}
                  size="small"
                  label="Please describe yourself / your company. What is your field of focus?*"
                  id="description"
                  name="description"
                  value={values.description}
                  helperText={errors.description}
                  multiline
                  rows={4}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  sx={{ width: "100%" }}
                />
                <span className="checkbox-title mt-3">
                Which part of World of Dypians are you interested in? Select all that apply*
                </span>
                <div className="checkbox-grid">
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      onChange={() => addProducts("Mini gaming")}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#00FECF",
                        },
                      }}
                    />
                    <span className="checkbox-title">Mini gaming</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      onChange={() => addProducts("New charcter creation")}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#00FECF",
                        },
                      }}
                    />
                    <span className="checkbox-title">
                      New charcter creation
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      onChange={() =>
                        addProducts("Transfer NFT or NFT collection")
                      }
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#00FECF",
                        },
                      }}
                    />
                    <span className="checkbox-title">
                      Transfer NFT or NFT collection
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      onChange={() => addProducts("New character skin")}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#00FECF",
                        },
                      }}
                    />
                    <span className="checkbox-title">New character skin</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      onChange={() => addProducts("In-game resources")}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#00FECF",
                        },
                      }}
                    />
                    <span className="checkbox-title">In-game resources</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      onChange={() => addProducts("Other")}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#00FECF",
                        },
                      }}
                    />
                    <span className="checkbox-title">Other</span>
                  </div>
                </div>
                {errors?.interests && (
                  <div className="error-span">{errors.interests}</div>
                )}
                <hr className="partner-divider" />
                <div className="d-flex align-items-center gap-2">
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#00FECF",
                      },
                    }}
                    onChange={() => setEnableSubmit(!enableSubmit)}
                  />
                  <span className="checkbox-title">
                    I agree to share my email address with Dypius for use in
                    accordance with the World of Dypians privacy policy,
                    including to receive communications.
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  {selectedFile ? (
                    <div className="d-flex align-items-center gap-2">
                      <div className="upload-btn-wrapper">
                        <button className="btn upload-btn d-flex align-items-center gap-2">
                          <img src={uploadedIcon} alt="" />
                          File added
                        </button>
                      </div>
                      <img
                        src={xMark}
                        alt="x mark"
                        onClick={handleChangeBg}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ) : (
                    <div className="upload-btn-wrapper">
                      <button className="btn upload-btn d-flex align-items-center gap-2">
                        <input
                          type="file"
                          style={{
                            opacity: "0",
                            position: "absolute",
                            cursor: "pointer",
                            width: "100px",
                          }}
                          className="p-2"
                          onChange={(e) => onFileChange(e)}
                        />
                        Upload File
                        <img src={uploadIcon} alt="" />
                      </button>
                    </div>
                  )}
                  <div
                    className={`${
                      enableSubmit ? "linear-border" : "linear-border-disabled"
                    }`}
                  >
                    <button
                      className="btn filled-btn px-5 d-flex align-items-center gap-2"
                      onClick={handleSubmit}
                      disabled={!enableSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <ReCaptchaV2
                  sitekey="6LflZgEgAAAAAO-psvqdoreRgcDdtkQUmYXoHuy2"
                  style={{ display: "inline-block" }}
                  theme="dark"
                  size="invisible"
                  ref={recaptchaRef}
                />
              </div>
            </div>
          </FormContainer> */}
        </div>
      </div>
      {success && (
        <OutsideClickHandler onOutsideClick={() => setSuccess(false)}>
          <div className="success-modal d-flex flex-column p-3 justify-content-center align-items-center gap-4">
            <div className="d-flex w-100 justify-content-end">
              <img
                src={modalClose}
                alt="close modal"
                onClick={() => setSuccess(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <img src={newsLetterModal} alt="success" />
            <h6 className="newsletter-modal-title font-poppins">Thank you</h6>
            <span className="newsletter-modal-span font-poppins">
              You’ve sucessfully submited your request to World of Dypians
            </span>
          </div>
        </OutsideClickHandler>
      )}
      {businessSuccess && (
        <OutsideClickHandler onOutsideClick={() => setbusinessSuccess(false)}>
          <div className="success-modal d-flex flex-column p-3 justify-content-center align-items-center gap-4">
            <div className="d-flex w-100 justify-content-end">
              <img
                src={modalClose}
                alt="close modal"
                onClick={() => setbusinessSuccess(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <img src={newsLetterModal} alt="success" />
            <h6 className="newsletter-modal-title font-poppins">Thank you</h6>
            <span className="newsletter-modal-span font-poppins">
              You've sucessfully submited your request to World of Dypians
            </span>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default PartnerForm;
