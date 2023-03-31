import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Plumasidenav from "./Other Components/Plumasidenav";

// import { Layout } from "antd";
import { Thankyou } from "./Components/Authentication/ThankYou/Thankyou";
// import { Setpassword } from "./Components/Authentication/Setpassword/Setpassword";
import { Forgotpassword } from "./Components/Authentication/Forgotpassword/Forgotpassword";
import { Sentcode } from "./Components/Authentication/Sentcode/Sentcode";
import { TermsConditions } from "./Components/Authentication/TermsConditions/TermsConditions";
import { Home } from "./Components/PagesAfterAuthentication/Anoni/Home";
// import { Layout } from "antd";
import { Verify } from "./Components/PagesAfterAuthentication/Verification/Verify";

import { Loading } from "./Other Components/Loading/Loading";
import { View } from "./Components/PagesAfterAuthentication/Anoni/View/View";
import { Test } from "./Components/PagesAfterAuthentication/Anoni/Test";

import { Createaccount } from "./Components/Authentication/CreateAccount/CreateAccount";
import { Login } from "./Components/Authentication/Login/Login";
import Settings from "./Other Components/settings/Settings";
import Help from "./Other Components/Help/help";
import { Sidermain } from "./Other Components/Sidermain/Sidermain";

// const { Footer, } = Layout;

//using routes with exact paths, later outlet and auth will be used for better accessibility,

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App" id="view">
          <div className="mini" style={{ overflowX: "auto", overflowY: "auto", minHeight: "310px", height: "100%" }}>
            <div className="secmini" >
              {/* <Plumasidenav /> */}

              <Routes>
                <Route
                  exact
                  path="/CreateAccount"
                  element={<Createaccount />}
                />

                <Route exact path="/" element={<Sidermain />}>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/Settings" element={<Settings />} />
                  <Route exact path="/help" element={<Help />} />
                </Route>
                <Route exact path="/login" element={<Login />} />

                <Route exact path="/thankyou" element={<Thankyou />} />

                {/* <Route exact path="/Setpassword" element={<Setpassword />} /> */}

                <Route
                  exact
                  path="/Forgotpassword"
                  element={<Forgotpassword />}
                />               

                <Route exact path="/Sentcode" element={<Sentcode />} />

                <Route
                  exact
                  path="/TermsConditions"
                  element={<TermsConditions />}
                />

                <Route exact path="/list" element={<Home />} />


                <Route exact path="/faq" element={<Home />} />

                <Route exact path="/verify/:_id" element={<Verify />} />

                <Route exact path="/loading" element={<Loading />} />

                <Route exact path="/view/:_id" element={<View />} />
                <Route path="*" element={<Navigate to="/" replace />} />

                <Route exact path="/test" element={<Test />} />
              </Routes>
            </div>
          </div>
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
