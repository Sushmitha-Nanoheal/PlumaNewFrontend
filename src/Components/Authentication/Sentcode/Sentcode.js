import { React } from "react";
//import ant design elements
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Input } from "antd";
import { Link } from "react-router-dom";
import "./Sentcode.css";

export const Sentcode = () => {
  return (
    <>
      <div className="Logincomponent">
        <div>
          <div className="LoginContainer1">
            <div className="containerLogin">
              <img
               className="ImageContainer"
                src="/assets/images/Group.png"
                alt="error"
              />
              <Button className="QuestionMarkButton">
                ?
              </Button>

              <div className="headingBlog" >
                <Link to="/CreateAccount">
                  <ArrowLeftOutlined className="ArrowLeftOutlined"/>
                </Link>
                <h1 className="CodeSentMSG">
                  OK! We sent you a Code
                </h1>
              </div>
              <div className="haveAccountLogin">
                <span>
                  Please enter the code sent to abcd@google.com within next 30
                  minutes.
                </span>
              </div>
              <Col className="inputContainer">
                <Col className="inputForm">
                  <div className="CodeBolck" >
                    <Col>Code</Col>
                  </div>
                  <Input
                    className="inputAntDesign"
                    placeholder="Enter the code here"
                  />
                </Col>
              </Col>

              <Button
                className="ContinueButton"
                type="primary"
              >
                Continue
              </Button>
              <div
                className="NotificationConformationMSG"
                 >
                <span className="ORmessageline">- OR -</span>
                <div className="LinkNotReceived" >
                  <div>Didnot receive the link? </div>
                  <Link className="SendAgain" to="/SentCode">
                    Send it again.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
