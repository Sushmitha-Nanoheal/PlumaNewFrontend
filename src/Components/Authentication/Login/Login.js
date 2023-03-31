import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchApi } from "../../PagesAfterAuthentication/FetchApi/utils";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import { Test } from "../../PagesAfterAuthentication/Anoni/Test";
import "./Login.css";

export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [buttondisablement, setbuttondisablement] = useState(false);
  const [checked, setChecked] = useState(false);

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
        `${process.env.REACT_APP_API_AFTER_URL_LOGIN_USER}`,
        "POST",
        { email: Email, password: Password },
        false
      )
        .then((response) => {
          if (!response.ok) {
            // window.location.reload();
            setLoader(false); // changed

            alert("Email or password doesn't match!!!");
            return;
          }
          return response.json();
        })
        .then((data) => {
          onLogin(data.token, Email);
          console.log("recieved success");
          setLoader(false);
          Navigate("/");
        });
    }

    function onLogin(token, email) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

    }

    setValidated(true);
  };


  return (
    <div className="LoginPage-Block">
      {Loader ? (
        <div className="LoaderClass">
          <Test />
        </div>
      ) : (
        <div className="FormHandler">
          <div className="HalfSideImage">
            <div className="BackgroundImage">
              <img
                src="/assets/images/Logo.svg"
                alt="Logo"
                className="LogoScreen"
              />
            </div>
          </div>

          <div className="Login-Section">
            <div className="LoginPageBorder">
              <Text id="LoginHeading">Account login</Text>
              <Text id="LoginPageSubHeading">Hi, If you are already a member please login with your email address and password.</Text>
              <form noValidate onSubmit={handleSubmit}>
                <div className="EmailLabel">
                  <InputField
                    help="Please enter a valid email id"
                    placeholder="your@email.com"
                    label="Email ID"
                    type="Email"
                    // inputMode="Email"
                    value={Email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}

                  />
                </div>

                <div className="PassworLabel">
                  <InputField
                    type="password"
                    label="Password"
                    help="Set strong password"
                    placeholder="1092893"
                    value={Password}
                    // inputMode="Password"

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

                  />
                </div>
                {buttondisablement ? (

                  <Text> Password length should be between 10 to 20 characters !!</Text>

                ) : (
                  <div></div>
                )}
                <div className="AllowNotification">
                  <Checkbox
                    label="Remember Me"
                    checked={checked}
                    name="lsRememberMe"
                    onChange={() => setChecked(!checked)}
                  />
                </div>

                <div className="LoginButton">
                  <Button
                    className="LoginHandle"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={buttondisablement}
                    validated={validated}
                  >
                    Login
                  </Button>
                  <div className="OptionsBlock" >
                    <Text>Don’t have an account ? <TextLink href="/createAccount">Create Account</TextLink></Text>

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
