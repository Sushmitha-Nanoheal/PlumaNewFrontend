// our main component from where all home pages are linked
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Layout } from "antd";
import Sider from "antd/lib/layout/Sider";
import "./Afterloginsidenav.css";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";


const { Footer, Content } = Layout;

export const Afterloginsidenav = (props) => {
  //using browxser location so that we can match it later with our ternary condition statements
  const location = useLocation();
  const path = location.pathname;
  console.log(location.pathname);
  return (
    <>
      <Container fluid>
        <Row>
          <div
            style={{
              display: "flex",
              zIndex: "10",
              alignItems: "center",
              width: "2.0rem"
            }}
          >
            <Sider
              collapsed={true}
              style={{
                backgroundColor: "#505C8B",
                top: "0rem",
                height: "59.9rem",
                marginLeft: "7.0rem",
                borderRadius: "1.2rem"
              }}
            >
              <div>
                {/* side nav bar for home page */}
                <Link to="/home">
                  <div>
                    <div
                      className={path === "/home" ? "borderwhite" : ""}
                      style={{
                        width: "100%",
                        display: "flex",
                        height: "8.0rem",
                        justifyContent: "center"
                      }}
                    >
                      <img
                        style={{ width: "4.0rem", zIndex: "10", scale: "110%" }}
                        src="/assets/SvgNav/VectorHome.svg"
                        alt="error"
                      />
                      {path === "/home" ? (
                        <div>
                          <img
                            style={{
                              width: "3.5rem",
                              zIndex: "10",
                              position: "relative",
                              left: "3.0rem",
                              marginLeft: "-2.0rem",
                              width: "2.0rem",
                              height: "7.0rem"
                            }}
                            src="/assets/SvgNav/Vectorarrow.svg"
                            alt="error"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
                <div>
                  {/* sidenavbar for information page */}
                  <Link style={{ position: "relative" }} to="/Information">
                    <div style={{ position: "relative", top: "10.0rem" }}>
                      <div
                        className={path === "/Information" ? "borderwhite" : ""}
                        style={{
                          width: "100%",
                          display: "flex",
                          height: "8.0rem",
                          justifyContent: "center"
                        }}
                      >
                        <img
                          style={{
                            width: "3.3rem",
                            zIndex: "10",
                            marginLeft: "0.8rem"
                          }}
                          src="/assets/SvgNav/VectorList.svg"
                          alt="error"
                        />
                        {path === "/Information" ? (
                          <div>
                            <img
                              style={{
                                width: "3.5rem",
                                zIndex: "10",
                                position: "relative",
                                left: "3.0rem",
                                marginLeft: "-1.7rem",
                                width: "1.7rem",
                                height: "7.0rem"
                              }}
                              src="/assets/SvgNav/Vectorarrow.svg"
                              alt="error"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* sidenav bar for faQ PAGE */}
                  <Link
                    style={{ position: "relative", top: "29.5rem" }}
                    to="/Faq"
                  >
                    <div
                      style={{
                        position: "relative",
                        marginTop: "3.0rem",
                        marginBottom: "3.0rem"
                      }}
                    >
                      <div
                        className={path === "/Faq" ? "borderwhite" : ""}
                        style={{
                          width: "100%",
                          display: "flex",
                          height: "8.0rem",
                          justifyContent: "center"
                        }}
                      >
                        <img
                          style={{
                            width: "2.5rem",
                            zIndex: "10",
                            marginLeft: "1.2rem"
                          }}
                          src="/assets/SvgNav/vectorquestionmark.svg"
                          alt="error"
                        />
                        {path === "/Faq" ? (
                          <div>
                            <img
                              style={{
                                width: "3.5rem",
                                zIndex: "10",
                                position: "relative",
                                left: "3.0rem",
                                marginLeft: "-1.7rem",
                                width: "2.0rem",
                                height: "7.0rem"
                              }}
                              src="/assets/SvgNav/Vectorarrow.svg"
                              alt="error"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </Sider>
            <div
              classname="welcometext"
              style={{
                marginLeft: "2.9rem",
                marginTop: "-53.0rem",
                fontWeight: "500",
                fontSize: "3.0rem",
                color: "#505C8B",
                fontFamily: ""
              }}
            >
              <p style={{ width: "2.8rem" }}>{props.text}</p>
            </div>

            {/* using ternary operator to apply differewnt avatar during myprofiler page */}
            {path === "/Myprofile" || path === "/Editprofile" ? (
              <div>
                {/* first statement */}

                <div
                  style={{
                    height: "10rem",
                    position: "relative",
                    top: "-10.0rem",
                    right: "20.0rem"
                  }}
                >
                  {path === "/Editprofile" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src="/assets/images/Girlprofilepic.png"
                        alt="error"
                      />
                      <Link className="my-3" to="/Myprofile">
                        Edit avatar
                      </Link>
                    </div>
                  ) : (
                    <img src="/assets/images/Girlprofilepic.png" alt="error" />
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    height: "1.0rem",
                    position: "relative",
                    top: "-31.0rem",
                    right: "-65.0rem"
                  }}
                >
                  <div className="dropdown">
                    <img
                      src="/assets/images/Girlprofilepic.png"
                      alt="error"
                      className="btn  dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link className="dropdown-item" to="/Myprofile">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <UserOutlined style={{ marginRight: "1.0rem" }} />
                          Profile
                        </div>
                      </Link>
                      <div class="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/login">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <LogoutOutlined style={{ marginRight: "1.0rem" }} />
                          Log Out
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer
            style={{
              backgroundColor: "#D9D9D9",
              paddingLeft: "90%",
              top: "6.8rem",
              position: "relative"
            }}
          >
            2022 pluma
          </Footer>
        </Row>
      </Container>
    </>
  );
};
