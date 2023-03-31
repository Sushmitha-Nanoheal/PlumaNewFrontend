import React, { useState, useEffect, useRef} from "react";
import "./Verify.css"


import { Link } from "react-router-dom";
import { fetchApi } from "../FetchApi/utils";
import Button from "@kiwicom/orbit-components/lib/Button";
// import { useRouter } from "next/router";

import { useParams } from "react-router-dom";
import { Loading } from "../../../Other Components/Loading/Loading";
import Text from "@kiwicom/orbit-components/lib/Text";

export const Verify = () => {
  // const router = useRouter();
  const [state, setState] = useState("verifying");
  const [Loader, setLoader] = useState(false);
  const para = useParams();
  const verifiedRef = useRef(false);

  useEffect(() => {
    if (para._id && !verifiedRef.current) {
        verifiedRef.current = true;
        setLoader(true);
        fetchApi(`${process.env.REACT_APP_API_AFTER_URL_VERIFY}${para._id}`, "POST", {}, false).then(
          (response) => {
            if (!response.ok) {
              setLoader(false);
              setState("failed");
              return;
            }
            setLoader(false);
            setState("verified");
            return;
          }
        );
    }
  }, []);

  const verified = () => {
    return (
      <>
        <Text id="RegisteredAlertMSG">
          You are successfully verified
        </Text>
        <Text id="AnotherEmail" >
          Click below to get back to login:{" "}
        </Text>
        <Link className="LinkToRegister" to="/login">
          <Button>
            Go to Login
          </Button>
        </Link>{" "}
      </>
    );
  };

  const uhoh = () => {
    return (
      <>
        <Text id="RegisteredAlertMSG" >
          Email Already Registered!
        </Text>
        <Text id="AnotherEmail" >Please use another Email </Text>
        <Link className="LinkToRegister" to="/createAccount">
          <Button id="BacktoRegister">
            Go back to Register
          </Button>
        </Link>
      </>
    );
  };

  return (
    <>
     <div className="Verifivation-Block" >
       {Loader ? (
        <Loading />
      ) : (
              <div className="VerifiedHighlightMSG">
                <div className="headingContainer">
                  {state === "verified" ? (
                    <Text id="VerifiedSubheading">Great!</Text>
                  ) : (
                    <Text id="VerifiedSubheading">UH OH!!</Text>
                  )}
                  {state === "verified" ? verified() : uhoh()}
                </div>
                </div>
                )}
                </div>         
    </>
  );
};
