import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = () => {
  return (
    <div className="container">
      <Webcam height={600} width={600} />
    </div>
  );
};

export default WebcamCapture
