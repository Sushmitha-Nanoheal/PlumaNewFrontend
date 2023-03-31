import React, {useEffect} from "react";
import { fabric } from "fabric";
import "./View/Viewer.css";

export const Calibrate = (props) => {

 
  const CORNER_LENGTH = 30;

  // eslint-disable-next-line no-unused-vars
  function handlePlay(event) {
    const canvas = new fabric.Canvas("preview");

    // Add video to the canvas
    const video = document.getElementById("video");
    const scaleX = props.width / video.width;
    const scaleY = props.height / video.height;

    const img = new fabric.Image(video, {
      left: 0,
      top: 0,
      originX: 0,
      originY: 0,
      scaleX: scaleX,
      scaleY: scaleY,
      objectCaching: false,
      selectable: false
    });
    canvas.add(img);

    // The selected area is represented by a polygon
    const selectedArea = new fabric.Polygon(
      [
        props.corners["NW"],
        props.corners["NE"],
        props.corners["SE"],
        props.corners["SW"]
      ],
      {
        fill: "blue",
        opacity: 0.1,
        selectable: false
      }
    );
    canvas.add(selectedArea);

    // The controls for the polygon
    let half_length = CORNER_LENGTH / 2;
    [
      [0, "NW"],
      [1, "NE"],
      [2, "SE"],
      [3, "SW"]
    ].forEach(([pos, key]) => {
      let x = props.corners[key].x;
      let y = props.corners[key].y;
      props.onCornerChange(key, Math.floor(x / scaleX), Math.floor(y / scaleY));
      let corner = new fabric.Rect({
        left: x - half_length,
        top: y - half_length,
        fill: "red",
        width: CORNER_LENGTH,
        height: CORNER_LENGTH,
        hasControls: false
      });

      // update the selected area on moving the corner
      corner.on("moving", function (options) {
        selectedArea.points[pos] = {
          x: options.transform.target.left + half_length,
          y: options.transform.target.top + half_length
        };
        selectedArea.dirty = true;
        props.onCornerChange(
          key,
          Math.floor(selectedArea.points[pos].x / scaleX),
          Math.floor(selectedArea.points[pos].y / scaleY)
        );
      });
      canvas.add(corner);
    });

    // render loop
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }

  //////////////////////

  // fetch the camera and start video
  useEffect(() => {

    


    async function fetchCamera() {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        // prefer rear camera on phones
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      const settings = cameraStream.getVideoTracks()[0].getSettings();
      const video = document.getElementById("video");
      video.height = settings.height;
      video.width = settings.width;
      video.srcObject = cameraStream;
      props.onCameraChange(settings.width, settings.height);
      video.addEventListener("play", handlePlay);
    }
    fetchCamera();
  }, []);

  return (
    <>
      <div className=" mr-auto text-center ColibrateSection">
        <canvas
          id="preview"
          width={940}
          height={465}
        ></canvas>
      </div>
    </>
  );
};
