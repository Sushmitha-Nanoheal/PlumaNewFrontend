import React from "react";
import "./Loading.css";

export const Loading = () => {
  return (
    <div className="LoadingScreeen">
      <img
        src="/assets/images/spinnerpurple.gif"
        className="img-fluid"
        alt="loading"
      ></img>
    </div>
  );
};
