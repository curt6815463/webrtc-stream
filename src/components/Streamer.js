import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useMediaStream from "../hook/useMediaStream.js";

const Streamer = ({ isLocal, isActive, connection, shouldClose }) => {
  const videoRef = useRef(null);
  const mediaStream = useMediaStream({ isLocal, connection, shouldClose });
  useEffect(() => {
    if (mediaStream) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.play();
    }
  }, [mediaStream, isActive]);

  return <Video ref={videoRef}> </Video>;
};

Streamer.propTypes = {
  isLocal: PropTypes.bool,
  isActive: PropTypes.bool,
  shouldClose: PropTypes.bool,
  connection: PropTypes.object,
};

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
`;
export default Streamer;
