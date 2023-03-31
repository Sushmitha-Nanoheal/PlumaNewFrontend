import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import { React } from "react";
// import { Col, Row } from "antd";
import "./ThankYou.css";

export const Thankyou = () => {
  return (
    <div className="Regards-Section">
       <div className="HalfSideImage">
          <div className="BackgroundImage">
            <img
              src="/assets/images/Logo.svg"
              alt="Logo" 
              className="LogoScreen"              
              />
          </div>
       </div>
      <div className="Thanking">      
        <div className="Thanking-Border">
            <Text id="Thank-You">Thank you!</Text>
            <Text id="endText">
              We have sent an email with her confirmation link to your email
              address. In order to complete the signup process, please click the
              confirmation link.
            </Text>
            <Text id="endText">
              If you did not receive a confirmation email, please check your
              spam folder. Also, please verify that you entered a valid email
              address in your sign-up form.
            </Text>
            <Text id="endText">         
            If you need assistance please  <TextLink id="ContactLink" href="#">contact us.</TextLink>
            </Text>
            <Text id="endText">         
            If you already have an account, click <TextLink id="ContactLink" href="/login">here to LogIn</TextLink>
            </Text>
        </div>
      </div>
    </div>
  );
};
