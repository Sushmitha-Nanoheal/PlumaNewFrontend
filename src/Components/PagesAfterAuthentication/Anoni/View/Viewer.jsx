import React, { 
  // useState,
   useEffect, useRef, useState } from "react";
import './Viewer.css';

function toPoints(data) {
  const points = Array(data.x.length);
  for (let i=0; i < data.x.length; i++) {
    points[i] = [data.x[i], data.y[i]];
  }
  return points;
}

// Blanks the image data to white.
function initImageData(imageData) {
  for (let i = 0; i < imageData.data.length; i++) {
    imageData.data[i] = 255;
  }
}

// Add points to the current image.
// @param The points as {x: list, y: list}
function addPoints(imageData, points) {
  for (let i = 0; i < points.length; i++) {
    let pos = points[i][1] * imageData.width * 4 + points[i][0] * 4;
    imageData.data[pos + 0] = 0;
    imageData.data[pos + 1] = 0;
    imageData.data[pos + 2] = 0;
  }
}

// Delete points (i.e. set to white) from the current image.
// @param points The points as {x: list, y: list}
function deletePoints(imageData, points) {
  for (let i = 0; i < points.length; i++) {
    let pos = points[i][1] * imageData.width * 4 + points[i][0] * 4;
    imageData.data[pos + 0] = 255;
    imageData.data[pos + 1] = 255;
    imageData.data[pos + 2] = 255;
  }
}

class Animator {
  constructor(width, 
    height, 
    botImage, topImage) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    this.imageData = new ImageData(width, height);
    initImageData(this.imageData);

    this.context.putImageData(this.imageData, 0, 0);
    botImage.src = this.canvas.toDataURL("image/png");
    this.botImage = botImage;

    topImage.src = this.canvas.toDataURL("image/png");
    this.topImage = topImage;
  }

  next(added, deleted) {
    // Apply the diff and set in canvas
    deletePoints(this.imageData, deleted);
    addPoints(this.imageData, added);
    this.context.putImageData(this.imageData, 0, 0);

    // Pick the correct image to change
    const image = this.topImage.classList.contains("transparent") ? this.topImage : this.botImage;

    // Set the imageData into the image
    image.src = this.canvas.toDataURL("image/png");

    // Activate transition
    this.topImage.classList.toggle("transparent");
  }
}

export const Viewer = (props) => {
  const createdRef = useRef(false);
  const[myheight,setmyheight]=useState("100%");

  function initialize(data) {
    props.onNameChange && props.onNameChange(data.name);

    window.animator = new Animator(data.width, data.height,
                                   document.getElementById("viewBottom"),
                                   document.getElementById("viewTop"));
    window.animator.next(toPoints(data.added), toPoints({'x': [], 'y': []}));
  }

  function processMessage(event) {
    const data = JSON.parse(event.data);
    if (!window.animator) {
      initialize(data);
    }
    else {
      window.animator.next(toPoints(data.added), toPoints(data.deleted));
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleSocketClose(event) {
    window.animator = undefined;
    props.onEnded && props.onEnded();
    props.update();
  }

  useEffect(() => {
    if (createdRef.current) {
      return;
    }
    if(props.height==100)
    {
      setmyheight("100%");
    }
    createdRef.current = true;
    window.viewSocket = new WebSocket(
      `${process.env.REACT_APP_API_URL_WEBSOCKET_PRESENTATION}${props.pid}/view`);
    window.viewSocket.addEventListener('message', processMessage);
    window.viewSocket.addEventListener('close', handleSocketClose);
  }, []);

  return (
    <div id="viewer"
         style={{
                 height: myheight,
                 }}
    >
      <img id="viewBottom" 
           style={{
                   height: myheight
                   }}/>
      <img id="viewTop" 
           style={{
                   height:myheight,
                  }}
       />
    </div>
  );
}
