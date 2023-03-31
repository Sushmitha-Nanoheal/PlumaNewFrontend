
import React, { useState, useEffect} from "react";
import "./Forcanvas";

import { Test } from "./Test";
// import { Col, Row } from "antd";

// import { Link } from "react-router-dom";
// import { fetchApi } from "../FetchApi/utils";
// import Button from "react-bootstrap/Button";


// import { useParams } from "react-router-dom";
// import { Loading } from "../../../Other Components/Loading/Loading";





function splitArray(arr, num) {
    return [arr.slice(0, num), arr.slice(num, arr.length)];
  }
  
  function toPoints(data) {
    const points = Array(data.x.length);
    for (let i=0; i < data.x.length; i++) {
      points[i] = [data.x[i], data.y[i]];
    }
    return points;
  }
  
  class Animator {
    constructor(context, imageData, lastTimestamp, dataStream=[], frameRate=30) {
      this.context = context;
      this.imageData = imageData;
      this.lastTimestamp = lastTimestamp;
      this.dataStream = dataStream;
      this.frameLength = Math.floor(1000 / frameRate);
      this.initImageData();
    }
  
    // Blanks the image data to white.
    initImageData() {
      for (let i = 0; i < this.imageData.data.length; i++) {
        this.imageData.data[i] = 255;
      }
      console.log('Initialized imageData');
    }
  
    addKeyFrame(timestamp, added, deleted) {
      // get time diff
      let numSections = Math.ceil((timestamp - this.lastTimestamp) / this.frameLength);
      // Divide points into smaller keyframes
      let pointsPerSection = Math.ceil((added.length + deleted.length) / numSections);
      for (let i=0; i < numSections; i++) {
        if (deleted.length > 0) {
          let points;
          [points, deleted] = splitArray(deleted, pointsPerSection);
          this.dataStream.push({
            add: false,
            points: points
          });
        }
        else {
          let points;
          [points, added] = splitArray(added, pointsPerSection);
          this.dataStream.push({
            add: true,
            points: points
          });
        }
      }
      this.lastTimestamp = timestamp;
    }
  
    start() {
      this.interval = setInterval(() => this.run(), this.frameLength);
    }
  
    stop() {
      this.interval = clearInterval(this.interval);
    }
  
    run() {
      if (this.dataStream.length == 0) {
        return;
      }
      let keyframe = this.dataStream.pop();
      if (keyframe.add) {
        this.addPoints(keyframe.points);
      }
      else {
        this.deletePoints(keyframe.points);
      }
      this.context.putImageData(this.imageData, 0, 0);
    }
  
    // Delete points (i.e. set to white) from the current image.
    // @param points The points as {x: list, y: list}
    deletePoints(points) {
      for (let i = 0; i < points.length; i++) {
        let pos = points[i][1] * this.imageData.width * 4 + points[i][0] * 4;
        this.imageData.data[pos + 0] = 255;
        this.imageData.data[pos + 1] = 255;
        this.imageData.data[pos + 2] = 255;
      }
    }
  
    // Add points to the current image.
    // @param The points as {x: list, y: list}
    addPoints(points) {
      for (let i = 0; i < points.length; i++) {
        let pos = points[i][1] * this.imageData.width * 4 + points[i][0] * 4;
        this.imageData.data[pos + 0] = 0;
        this.imageData.data[pos + 1] = 0;
        this.imageData.data[pos + 2] = 0;
      }
    }
  }
  

export const Forcanvas = (
    props
) => {
  
    const [presentationName, setPresentationName] = useState('Loading...');
  const [ended, setEnded] = useState(false);
  const [height, setHeight] = useState(720);
  const [width, setWidth] = useState(1280);
//   const[check,setcheck]=useState(props.Transferpid)
  // const dataFetchedRef = useRef(false);

  function initialize(data) {
    setPresentationName(data.name);
    setHeight(data.height);
    setWidth(data.width);
    const canvas = document.getElementById('view-canvas');
    const context = canvas.getContext('2d');
    window.animator = new Animator(
      context,
      context.createImageData(data.width, data.height),
      undefined
    );
    // add the points in the current snapshot and start the animator
    window.animator.addPoints(toPoints(data.added));
    window.animator.context.putImageData(
      window.animator.imageData, 0, 0);
    window.animator.start();
  }

  function update(data) {
    console.log(data);
    window.animator.addKeyFrame(
      data.timestamp,
      toPoints(data.added),
      toPoints(data.deleted)
    );
  }

  function processMessage(event) {
    console.log("inside processmessage");
    const data = JSON.parse(event.data);
    console.log("data-> " + data);
    if (!window.animator) {
      initialize(data);
    }
    else {
      update(data);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleSocketClose(event) {
    console.log("inside handlesocketclose");
    window.animator.stop();
    window.animator = undefined;
    setEnded(true);
  }

  useEffect(() => {
///
    


    // const segments = window.location.pathname.split('/');
    // handle potential trailing slash
    // const uuid = segments.pop() || segments.pop();
    // const uuid=props.Transferpid;
    // setcheck(props.Transferpid);
    // const uuid="kpVqBDmgxCMqJrb";
    // console.log("inside before settimeout")
    setTimeout(()=>
    {
        console.log("inside after settimeout");
        const uuid=props.Transferpid;
        console.log('>>>>', `wss://app.pluma.in/api/presentation/${uuid}/view`);
        window.viewSocket = new WebSocket(`${process.env.REACT_APP_API_URL_WEBSOCKET_PRESENTATION}${uuid}/view`);
        window.viewSocket.addEventListener('message', processMessage);
        window.viewSocket.addEventListener('close', handleSocketClose);

    },1000)
    // const uuid=props.Transferpid
    // console.log('>>>>', `wss://app.pluma.in/api/presentation/${uuid}/view`);
    // window.viewSocket = new WebSocket(`wss://app.pluma.in/api/presentation/${uuid}/view`);
    // window.viewSocket.addEventListener('message', processMessage);
    // window.viewSocket.addEventListener('close', handleSocketClose);
   
  }, []);

  ///

  if(ended)
  {
    props.update();
  }
  
// const rad=true;
  return (
   
        <div className="content">
     {console.log(presentationName)}
         
            {
              presentationName=="Loading..."?<div  className="TestingScreen"><Test/> </div>:<div className="col-md-10  mr-auto text-center LoaderBlock">
              <canvas id="view-canvas"  height={height} width={width} >
              </canvas>
            </div> } 
        </div>

  );
  
}

