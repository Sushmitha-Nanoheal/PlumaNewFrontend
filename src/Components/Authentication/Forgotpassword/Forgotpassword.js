import { React } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
//import ant design elements
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./Forgotpassword.css";

export const Forgotpassword = () => {
  return (
    <>
      <div className="Logincomponent LoginContainer">
        <div>
          <Row
            style={{ position: "relative", top: "-13rem", scale: "55%" }}
            className="container "
          >
            <div className="containerLogin">
              <img
                style={{
                  position: "absolute",
                  zIndex: "4",
                  width: "17rem",
                  left: "-11rem",
                  top: "25rem"
                }}
                src="/assets/images/Group.png"
                alt="error"
              />
              <Button
                style={{
                  position: "absolute",
                  borderRadius: "10rem",
                  backgroundColor: "#505C8B",
                  color: "#fff",
                  fontSize: "4rem",
                  width: "5.8rem",
                  height: "5.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "Prompt",
                  fontWeight: "600",
                  right: "-3rem",
                  bottom: "3rem"
                }}
              >
                ?
              </Button>
              <div
                className="backgroundBlue"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  backgroundColor: "#505c8b",
                  zIndex: "-1",
                  borderRadius: "5rem"
                }}
              />

              <div
                style={{ marginTop: "5%", display: "flex" }}
                className="heading"
              >
                <Link to="/Login">
                  <ArrowLeftOutlined
                    style={{ fontSize: "4.0rem", color: "#EAB354" }}
                  />
                </Link>
                <h1 style={{ height: "4.5rem", marginLeft: "2rem" }}>
                  Forgot Password
                </h1>
              </div>
              <div
                className="haveAccount"
                style={{ marginTop: "3.8rem", width: "75%" }}
              >
                <span>
                  If you have forgotten your password you can request to have it
                  reset. Please submit a reset password request with the email
                  connected to your account using the form below.
                </span>
              </div>
              <Col className="inputContainer">
                <Col className="inputForm">
                  <div
                    style={{
                      marginBottom: "2.4rem",

                      marginLeft: "1.6rem"
                    }}
                  >
                    <Col>Email</Col>
                  </div>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                </Col>
              </Col>

              <Button
                type="primary"
                style={{
                  marginTop: "5rem",
                  backgroundColor: "#FFB600",
                  borderRadius: "1rem",
                  border: "2rem",
                  width: "28rem",
                  height: "5rem"
                }}
              >
                Send link
              </Button>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <span style={{ marginTop: "5rem" }}>- OR -</span>
                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "center",
                    maxWidth: "600rem",
                    marginTop: "8rem",
                    height: "4rem"
                  }}
                >
                  <div>Didnot receive the link? </div>
                  <Link style={{ color: "#EAB354" }} to="/Login">
                    Send it again.
                  </Link>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};
