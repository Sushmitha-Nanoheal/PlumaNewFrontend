import React from "react";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";
import "./SessionEnds.css";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import { Navigate } from "react-router";
import { ChevronBackward, InformationCircle } from "@kiwicom/orbit-components/lib/icons";


export const SessionEnds = () => {

  /* eslint-disable no-constant-condition */
  return (
    <>
      <div className="Review-Sections">
        <div className="NextButtonForSessionOverview" >
          <div className="Next-Button-Session">
            <TextLink
              id="BackToHomePage"
              onClick={() => (Navigate("/home"), window.location.reload())}
            >
              <ChevronBackward />
              Back to Home Page
            </TextLink>

            <Heading id="SessionEnded">Thank you!</Heading>
            <div className="SmallParagraph">
              <Text id="TextParagraph">
                <InformationCircle color="tertiary" />
                Session 0245 is now closed. Click on Start a new session to start a new session
              </Text>
            </div>
          </div>
        </div>
        <div className="Review-Block">
          <div className="SessionEndingLevel">
            <div>
              <Button
                className="CopyURLHeading"
                onClick={() => {
                  window.location.reload();

                }} >
                Start a New Session
              </Button>
            </div>

          </div>
          <div className="ScreenEndSessionTest" >

            <canvas id="debug-canvas" height="400" width="400" hidden></canvas>

            <div className="EndSessionBlock">
              <div className="SessionBackground"></div>
              <Heading id="SessionStopHead">Session Stopped</Heading>
            </div>

            <canvas id="capture-canvas" hidden></canvas>

            <div className="preview-TimeElapsedBlock">
              <Text
                id="starttime"
              ></Text>

            </div>
            <div className="TimeSession">
              <Text id="SessionDuration">Session Duration</Text>
              <Heading id="SessionTiming">89:34</Heading>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
