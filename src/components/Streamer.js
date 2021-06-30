import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Streamer = ({ mediaStream }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (mediaStream) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.play();
    }
  }, [mediaStream]);

  return <Video ref={videoRef}> </Video>;
};

Streamer.propTypes = {
  mediaStream: PropTypes.object,
};

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
`;
export default Streamer;
