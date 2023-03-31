import React from "react";

import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";
import "./SessionEnds.css";
import Heading from "@kiwicom/orbit-components/lib/Heading";




export const SessionEnded = () => {


  return (
    <>
      <div className="ReviewClassentryLevel">
        <div className="NewSessionHeading" >
          <div>
            <div>
              <Button
                className="CopyURLHeading"
                onClick={() => {
                window.location.reload();
                }} >
                Start A New Session
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="PreviewerBlock" >
      <canvas id="debug-canvas" height="400" width="400" hidden></canvas>
         <div id="doblur" className="ViewerBlock">
         <div id="viewerSessionEnd">         
          </div>
          <div className="SessionStopped">Session Stopped</div>
          </div>
          <canvas id="capture-canvas" hidden></canvas>
        <div className="TimeElapsedBlock">
          <Text id="TimingTesting">
           Session Duration
          </Text>
          <Heading id="TimingTesting">
           89:34
          </Heading>
      </div>
      </div>
    </>
  );
};
