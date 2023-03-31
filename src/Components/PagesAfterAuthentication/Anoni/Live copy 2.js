import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import Button from "@kiwicom/orbit-components/lib/Button";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Text from "@kiwicom/orbit-components/lib/Text";
import Dialog from "@kiwicom/orbit-components/lib/Dialog";
import { Viewer } from "./View/Viewer";
import { Test } from "./Test";
import "./Live.css";
import { CheckCircle } from "@kiwicom/orbit-components/lib/icons";
import Stack from "@kiwicom/orbit-components/lib/Stack";


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const Live = (props) => {
  const [startPreview, setStartPreview] = useState(undefined);
  const [debugCount, setDebugCount] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [copySession] = useState(
    `${process.env.REACT_APP_API_URL_VIEW}${props.pid}`
  );
  const [copiedbox, setcopiedbox] = useState(false);
  const [changeTime, setChangeTime] = useState(false);
  const verifiedRef = useRef(false);
  const [showDialog, setShowDialog] = React.useState(false);

  function capture(startTime, video, webSocket) {
    const canvas = document.getElementById("capture-canvas");
    if (canvas === null) {
      return;
    }
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob(async function (blob) {
      let timestamp = Date.now() - startTime;
      webSocket.send(JSON.stringify({ timestamp: timestamp }));
      webSocket.send(blob);
    }, "image/jpeg");
  }

  function debugCapture(debugImages) {
    const video = document.getElementById("video");
    const debugCanvas = document.getElementById("debug-canvas");
    if (debugCanvas === null) {
      return;
    }
    debugCanvas
      .getContext("2d")
      .drawImage(
        video,
        getRandomInt(video.width - 400),
        getRandomInt(video.height - 400),
        400,
        400,
        0,
        0,
        400,
        400
      );
    debugCanvas.toBlob(async function (blob) {
      debugImages.push(blob);
      setDebugCount(debugImages.length);
    }, "image/jpeg");
  }

  function downloadZip(debugImages) {
    const zip = new JSZip();
    var index = 0;
    debugImages.forEach((blob) => {
      zip.file(index + ".jpeg", blob);
      index += 1;
    });
    zip.generateAsync({ type: "blob" }).then(
      (blob) => {
        FileSaver.saveAs(blob, `${props.pid}.zip`);
      },
      (err) => console.log(err)
    );
  }

  function tick(startTime) {
    setSecondsElapsed((Date.now() - startTime) / 1000);
  }

  useEffect(() => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("capture-canvas");
    const startTime = Date.now();
    canvas.width = video.width;
    canvas.height = video.height;
   

    if (!verifiedRef.current) {
      verifiedRef.current = true;
      onclickpresenttime();
    }

    const webSocket = new WebSocket(
      `${process.env.REACT_APP_API_URL_WEBSOCKET_PRESENTATION}${props.pid}/publish/${props.publishKey}`
    );
    // Read Ack before sending next frame
    webSocket.addEventListener("message", (event) => {
      // If anything other than ok, stop.
      if (event.data == "ok") {
        setStartPreview(true);
        capture(startTime, video, webSocket);
      }
    });
    // Start capture
    // eslint-disable-next-line no-unused-vars
    webSocket.addEventListener("open", (event) => {
      capture(startTime, video, webSocket);
    });

    // Session clock

    const timerInterval = setInterval(() => tick(startTime), 1000);
    //setTimerId(timerInterval)
    // Capture for debug
    const debugImages = [];
    const debugInterval = setInterval(() => debugCapture(debugImages), 30000);
    document
      .getElementById("HideButton")
      .addEventListener("click", () => downloadZip(debugImages));
      const ticker= setInterval( 1000);
      clearInterval(ticker);
    // Cleanup
    return () => {
      clearInterval(debugInterval);
      clearInterval(timerInterval);
      webSocket.close();
    };
  }, []);


  const hh = String(Math.floor(secondsElapsed / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(
    2,
    "0"
  );
  const ss = String(Math.floor(secondsElapsed % 60)).padStart(2, "0");
  
  function timeElapsed() {
    console.log(`${hh}:${mm}:${ss}`)
    
    
    return (
      <>
      <Text id="TimeDurationheading">Session Duration</Text>
    <Text id="TimingBlock">{hh}:{mm}:{ss}</Text>
    </>
     )
  }

  function onclickpresenttime() {
    const obj1 = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const obj2 = new Date().toLocaleTimeString();
    const obj = { obj1, obj2 };
    const ele = document.getElementById("starttime");
    ele.innerHTML += `<div classname="starttimeingg"><Text className="StartTimeHeading">Start Time :</Text><Text> ${obj.obj1}</Text></div><Text>${obj.obj2}<Text>`;
  }

  /* eslint-disable no-unused-vars */
  const update = () => {
    setChangeTime(true);  
  };

  /* eslint-disable no-constant-condition */
  return (
    <>
      <div className="LiveClassBlock">
      <div className="URLNotification">
        <p className="URLBlock-Session">{copiedbox?
        <div className="Copy-URL-Block">
          <Stack direction='columns'>
            <CheckCircle color="success"/>
            <Text>URL Copied!</Text>
          </Stack>
            </div>:<></>}</p></div>
        <div className="URLCopyBlock">
        <div className="InputURL">
          <InputField  
            required
            type="text"
            value={copySession}
          />
        </div>
          <div className="CopyURLMSG-Block">
             <div>
              <Button
                onClick={() => {
                  setcopiedbox(true);
                  navigator.clipboard.writeText(copySession);
                   setTimeout(() => {
                    setcopiedbox(false);
                  }, 1500);
                }} >
                Copy URL
              </Button>
          </div>
        </div>
        </div>
        </div>
      <div className="PreviewerBlock" >
        <canvas id="debug-canvas" height="400" width="400" hidden></canvas>
    
        {startPreview ? (
          <div className="ViewerBlock">
            <Viewer onEnded={update} pid={props.pid} scale={0.4} height={100} />
          </div>
        ) : (
          <div className="TestBlock" >
            <Test />
          </div>
        )}

        <canvas id="capture-canvas" hidden></canvas>
        <div className="TimeElapsedBlock">
        <Text id="starttime"></Text>
          <Text id="TimingTesting">
            {changeTime ? (
             <></>
            ) : (
              timeElapsed()
            )}
          </Text>
          {!showDialog && (
              <Button
                onClick={() => {
                  setShowDialog(true);
                }}
              >
                {changeTime ? <div>Start Session</div> :<div>Stop Session</div> }
              </Button>
            )}
            <Button
              id="HideButton"
            >
              Debug ({debugCount})
            </Button>
            {showDialog && (
        <Dialog
          title="Accept notifications?"
          description="Stay up to date with all travel possibilities."
          renderInPortal={false}
          primaryAction={
            <Button
              type="critical"
              onClick={() => {
                setShowDialog(false);                
              }}
            >
             Stop Session
            </Button>
          }
          secondaryAction={
            <Button
              type="secondary"
              onClick={() => {
                setShowDialog(false);
              }}
            >
              Cancel
            </Button>
          }
        />
      )}
        </div>
      </div>
    </>
  );
};
