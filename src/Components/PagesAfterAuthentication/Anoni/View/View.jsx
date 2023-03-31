import React, { useState } from "react";
import { Viewer } from "./Viewer";
import { useParams } from "react-router-dom";
import "./Viewer.css";
import Heading from "@kiwicom/orbit-components/lib/Heading";

export function View() {
  const params = useParams();
  const [presentationName, setPresentationName] = useState("Loading...");

  function onNameChange(name) {
    setPresentationName(name);
  }

  function onEnded() {
    setPresentationName((name) => name + " [ENDED]");
  }

  return (
    <div className="forFlex">
      <div className="PresentationPageBlock" >
        <div id="presentationHead">
          <img src="/assets/images/Logo.svg" />
          <Heading
            id="PresentationNameSec"
          >
            {presentationName}
          </Heading>
        </div>
        <div className="ViewerDisplay">
          <Viewer
            pid={params._id}
            onNameChange={onNameChange}
            onEnded={onEnded}
            scale={0.8}
            width={87}
          />
        </div>
      </div>
    </div>
  );
}
