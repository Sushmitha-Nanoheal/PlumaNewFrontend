// our main component from where all home pages are linked
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@kiwicom/orbit-components/lib/Button";
import { Live } from "./Live";
import { Calibrate } from "./Calibrate";
// import { Startsession } from "./Startsession";
// import { Sidermain } from "../../../Other Components/Sidermain/Sidermain";
import { fetchApi } from "../FetchApi/utils";
import Text from "@kiwicom/orbit-components/lib/Text";
import InputFeild from "@kiwicom/orbit-components/lib/InputField";
import { ChevronBackward, ChevronForward, InformationCircle } from "@kiwicom/orbit-components/icons"
// import { AlertCircle } from "@kiwicom/orbit-components/icons"
import "./Home.css";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import { Preview } from "./Preview";
// import Heading from "@kiwicom/orbit-components/lib/Heading";
import { SessionEnded } from "./SessionEnds";


export const Home = () => {
  const location = useLocation();
  const path = location.pathname;
  const Navigate = useNavigate();

  useEffect(() => {

    const auth = localStorage.getItem("token");
    if (!auth) {
      Navigate("/login");
    }



  }, [])



  const canvasHeight = 465;
  const canvasWidth = 940; //changed
  const [progressIndex, setProgressIndex] = useState(0);
  const [presentationName, setpresentationName] = useState("");
  const [pid, setPid] = useState(undefined);
  const [publishKey, setPublishKey] = useState(undefined);
  const [cameraShape, setCameraShape] = useState([undefined, undefined]);
  const [startsessionbutton, setstartsessionbutton] = useState("");


  const corners = {};

  ["NW", "NE", "SE", "SW"].forEach((key) => {
    corners[key] = useState(undefined);
  });

  function createPresentationPart1() {
    fetchApi(`${process.env.REACT_APP_API_AFTER_URL_PRESENTATION}`, "POST", {
      name: presentationName,
      camera_shape: cameraShape,
      corners: Object.fromEntries(
        Object.entries(corners).map(([key, value]) => [key, value[0]])
      )
    })
      .then((response) => {
        if (!response.ok) {
          console.log("inside create");
          throw new Error("Unable to create a presentation");
        }
        return response.json();
      })
      .then((data) => {
        console.log("outside create");
        console.log("id->" + data.id);
        setPid(data.id);
        console.log("publish key->" + data.publish_key);
        setPublishKey(data.publish_key);
        setProgressIndex(2);
      });

  }


  function goToNext() {
    if (progressIndex == 3) {
      window.location.reload();

    } else if (progressIndex == 2) {
      // createPresentation();
      setProgressIndex(progressIndex + 1);

    } else if (progressIndex == 1) {
      createPresentationPart1();
    } else {
      // eslint-disable-next-line no-unused-vars
      setProgressIndex((state, props) => state + 1);
    }
  }

  function nextButton() {

    var name = "Start Session";

    if (progressIndex == 1) {
      name = <Text id="NextButton-Step1">Next<ChevronForward /></Text>;

    } else if (progressIndex == 2) {
      name = <Text id="NextButton-Step1">Start Session<ChevronForward /></Text>;

    } else if (progressIndex == 3) {
      name = "Stop";

    } else if (progressIndex == 4) {
      name = <Text id="NextButton-Step1">Start New Session<ChevronForward /></Text>;
    }

    return (
      <Button
        type="submit"
        onClick={goToNext}
      >
        {name}
      </Button>
    );
  }

  function initialCorners() {
    const savedCorners = localStorage.getItem("corners");
    if (savedCorners === null) {
      return {
        NW: { x: 20, y: 20 },
        NE: { x: canvasWidth - 20, y: 20 },
        SE: { x: canvasWidth - 20, y: canvasHeight - 20 },
        SW: { x: 20, y: canvasHeight - 20 }
      };
    } else {
      return JSON.parse(savedCorners);
    }
  }

  const previous = (e) => {
    setProgressIndex(progressIndex - 1);
    e.preventDefault();

  }
  /* eslint-disable no-constant-condition */
  return (
    <>
      <div className="ContainerFlow">
        <div className="ConditionContainer">
          <div className="rightpinkcontainer" >
            <div
              id="SessionContainerBlog"
              className={progressIndex === 3 ?
                "bg-white shadow-none" : ""}
            >
              {path === "/" ? (
                <>
                  <video id="video" autoPlay hidden></video>

                  {progressIndex === 0 && (
                    <>
                      {/* true ? <>{Startsession()}</> : <div></div> */}
                      {/* <>{Startsession()}</> */}
                      <div className="SessionStep1">
                        <div className="SessionContainer">
                          <Text
                            id="SessionHeading"
                          >
                            Welcome!
                          </Text>
                          <Text
                            id="SessionNotification"
                          >
                            Enter and Click on the start session button to start a new session
                          </Text>
                          <InputFeild
                            id="SessionNameInputLabel"
                            onChange={(e) => {
                              e.preventDefault();
                              setstartsessionbutton(e.target.value);
                              setpresentationName(e.target.value)
                            }}
                            value={startsessionbutton}
                            required
                            type="text"
                          />

                          <Button
                            type="submit"
                            disabled={startsessionbutton ? false : true}
                            onClick={goToNext}
                            id="goToNextButton"
                          >
                            Start Session
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {progressIndex === 1 && (
                    <>
                      <div className="progressIndex-step1">


                        {true ? (
                          <div className="NextButtonForSessionOverview" >
                            <div className="Next-Button-Session">
                              <TextLink
                                id="BackToHomePage"
                                onClick={() =>
                                (Navigate("/home"),
                                  window.location.reload())}
                              >
                                <ChevronBackward />
                                Back to Home Page
                              </TextLink>

                              <Text
                                id="SessionTitle"
                              >
                                Session 0245
                              </Text>
                              <div
                                className="SmallParagraph"
                              >
                                <Text id="TextParagraph">
                                  Click on the boundaries to configure the
                                  camera capture area. Once you are happy with
                                  your selection, Please click on the next button to
                                  generate the session URL.
                                </Text>
                                <div id="NXTBtn">  {nextButton()}</div>
                              </div>
                            </div>
                          </div>

                        ) : (
                          <div></div>
                        )}

                        <div className="ColibratePart" >
                          <Calibrate
                            width={940} //changed
                            height={465}
                            corners={initialCorners()}
                            onCameraChange={(width, height) =>
                              setCameraShape([height, width])
                            }
                            onCornerChange={(key, x, y) =>
                              corners[key][1]([x, y])
                            }
                          />
                        </div>

                      </div>
                    </>
                  )}
                  {progressIndex === 2 && (
                    <div className="Review-Sections">
                      <div className="NextButtonForSessionOverview" >
                        <div className="Next-Button-Session">
                          <TextLink
                            id="BackToHomePage"
                            onClick={previous}
                          >
                            <ChevronBackward />
                            Reselect the Presentation Area
                          </TextLink>

                          <Text id="SessionTitle">Session 0245</Text>
                          <div className="SmallParagraph">
                            <Text
                              id="TextParagraph"
                            >
                              <InformationCircle color="Tertiary" />Please share the following results with students/ participants so that they can start viewing your whiteboard
                            </Text>
                            {/* <div id="NXTBtn-2"> {nextButton()}</div> */}
                          </div>
                        </div>
                      </div>
                      <div className="Review-Block">
                        <Preview
                          myprogressIndex={setProgressIndex}
                          pid={pid}
                          publishKey={publishKey}
                        />
                      </div>
                    </div>
                  )}
                  {progressIndex === 3 && (
                    <div className="Review-Sections">
                      <div className="NextButtonForSessionOverview" >
                        <div className="Next-Button-Session">
                          <TextLink
                            id="BackToHomePage"
                            onClick={() =>
                            (Navigate("/home"),
                              window.location.reload())}
                          >
                            <ChevronBackward />
                            Back to Home Page
                          </TextLink>

                          <Text id="SessionTitle">Session 0245</Text>
                          <div className="SmallParagraph">
                            <Text id="TextParagraph">
                              <InformationCircle color="tertiary" />Please share the following results with students/ participants so that they can start viewing your whiteboard
                            </Text>
                            <div id="NXTBtn-3"> {nextButton()}</div>
                          </div>
                        </div>
                      </div>
                      <div className="Review-Block">
                        <Live
                          myprogressIndex={setProgressIndex}
                          pid={pid}
                          publishKey={publishKey} />
                      </div>
                    </div>
                  )}
                  {progressIndex === 4 && (
                    <div className="Review-Sections">
                      <div className="NextButtonForSessionOverview" >
                        <div className="Next-Button-Session">
                          <TextLink
                            id="BackToHomePage"
                            onClick={() => window.location.reload()}
                          >
                            <ChevronBackward />
                            Back to Home Page
                          </TextLink>

                          <Text id="SessionTitle">Thank You!</Text>
                          <div className="SmallParagraph">
                            <Text id="TextParagraph">
                              <InformationCircle color="tertiary" />Session 0245 is now closed. Click on Start a new session to start a new session
                            </Text>

                          </div>
                        </div>
                      </div>
                      <div className="Review-Block">
                        <SessionEnded
                          pid={pid}
                          publishKey={publishKey}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
