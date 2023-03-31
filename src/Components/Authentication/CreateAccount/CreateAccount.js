import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@kiwicom/orbit-components/lib/Button";
import { fetchApi } from "../../PagesAfterAuthentication/FetchApi/utils";
import { Test } from "../../PagesAfterAuthentication/Anoni/Test";
import "./CreateAccount.css";
import Text from "@kiwicom/orbit-components/lib/Text";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import Modal, { ModalHeader } from "@kiwicom/orbit-components/lib/Modal";
import { TermsConditions } from "../TermsConditions/TermsConditions";



export const Createaccount = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loader, setLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [buttondisablement, setbuttondisablement] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      Navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("inside if handlesubmit");
    } else {
      setLoader(true);
      fetchApi(
        `${process.env.REACT_APP_API_AFTER_URL_CREATE_USER}`,
        "POST",
        { email: Email, password: Password },
        false
      ).then(async (response) => {
        setLoader(false);
        if (!response.ok) {
          console.log("bad request");
          setLoader(false);
          alert("Email already exists!!! please try with new email");
        } else {
          console.log("good request");
          Navigate("/Thankyou");
          localStorage.setItem("FullName", FullName);
        }
      });
    }

    setValidated(true);
  };

  console.log(FullName);
  console.log(Email);
  console.log(Password);

  return (
    <div className="CreateAccount-block">
      {Loader ? (
        <div>
          <Test />
        </div>
      ) : (
          <div className="CreateAccount-Handler"> 
            <div className="HalfSideImage">
              <div className="BackgroundImage">
              <img
                src="/assets/images/Logo.svg"
                alt="Logo"
                className="LogoScreen"
              />
            </div>
            </div>
            <div className="CreateAccount-Section">
              <div className="CreateAccountScreen-Border">
                <Text id="RegisterHeading">Account SignUp</Text>
                <Text id="RegisterParagraph">Become a member and start sharing</Text>
              <form noValidate  onSubmit={handleSubmit}>
                <div className="NameLabel">
                <InputField
                help="Enter Your FullName"
                label="Full Name"
                type="text"
                id="InputFieldBlog"
                placeholder="John Doe"
                value={FullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                // prefix={<UserOutlined />}
                />
                </div>
                <div className="CA-EmailLabel">
                  <InputField 
                  help="Enter Valid Email "
                  label="Email ID"
                  type="email"
                  id="InputFieldBlog"
                  placeholder="You@gmail.com"
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) {
                      setbuttondisablement(true);
                    }
                  }}
                  // required
                  />
                </div>
                <div className="CA-Password">
                  <InputField
                  help="Set strong password"
                  label="Password"
                  type="password"
                  id="InputFieldBlog"
                  placeholder={123827436}
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (
                      e.target.value.length > 10 &&
                      e.target.value.length < 20
                    ) {
                      setbuttondisablement(false);
                    } else {
                      setbuttondisablement(true);
                    }
                  }}
                  // required
                  />
                </div>
                
                  {buttondisablement ? (
                    <div
                     
                      className="text-danger"
                    >
                      Password length should be between 10 to 20 characters !!
                    </div>
                  ) : (
                    <div></div>
                  )}
               
              <div className="TermsConditions-Block">
              <div className="LinkForTAC">
                <Checkbox
                      label="I agree to the "
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                </div>
                <div className="TAC-Link">
                {showModal && (
                  <Modal
                    onClose={() => {
                      setShowModal(false);
                    }}
                  >
                    <ModalHeader
                      description={<TermsConditions/>}
                    />
                    
                  </Modal>
                )}
                {!showModal && (
                  <Button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    id="TermsAndConditionButton"
                  >
                    terms and conditions
                  </Button>
                )}
                        
                </div>
                </div>
                <div className="RegiterButton">
                  <div className="SubmitButtonToRegister">
                  <Button
                    className="SubmitBtn"                 
                    type="submit"
                    disabled={buttondisablement}
                    validated={validated}
                    onClick={handleSubmit}
                  >
                    Create an account
                  </Button>  
                  </div>        
                  <div className="AlreadyHaveAccount">
                    <span>Already have an account ? </span>
                    <Link  to="/Login">
                      Login Here
                    </Link>
                  </div>
                </div>            
              </form>
            </div>
            </div>
          </div>       
      )}
    </div>
  );
};
