import React, { useState } from "react";

import Button from "@kiwicom/orbit-components/lib/Button";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Text from "@kiwicom/orbit-components/lib/Text";
import "./Preview.css";




export const Preview = (props) => {
  const [copySession] = useState(``);
  const [copiedbox, setcopiedbox] = useState(false);

  return (
    <>
      <div className="ReviewClassentryLevel">
        <div className="URLCopyBlock" >
          <div className="InputURL">
            <InputField
              required
              type="text"
              value={copySession}
            />
          </div>
          <div>
            <div>
              <Button
                className="CopyURLHeading"
                onClick={() => {
                  setcopiedbox(true);
                  //   console.log("Copied")
                  navigator.clipboard.writeText(copySession);
                  setTimeout(() => {
                    console.log(copiedbox)
                    setcopiedbox(false);
                    // alert("URL Copied")
                  }, 1500);

                }} >
                Copy URL
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="ScreenPreviewTest" >

        <canvas id="debug-canvas" height="400" width="400" hidden></canvas>

        <div className="PreviewCanvas">preview canvas</div>

        <canvas id="capture-canvas" hidden></canvas>

        <div className="preview-TimeElapsedBlock">
          <Text
            id="starttime"
          > </Text>

        </div>
        <div className="StartSession">
          <Button
          id="StartSession"
          onClick={()=> props.myprogressIndex(3)}
          >Start Session</Button>        
        </div>
      </div>
    </>
  );
};
