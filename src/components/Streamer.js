import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// import stream from '../reducers/stream.js';

const Streamer = ({ streamSource, isLocal }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (!streamSource || !videoRef) return;
    console.log("isLocal, streamSource", isLocal, streamSource);
    if (streamSource.active) {
      videoRef.current.srcObject = streamSource;
      videoRef.current.play();
    }
  }, [streamSource]);

  return <Video ref={videoRef}> </Video>;
};

Streamer.propTypes = {
  streamSource: PropTypes.object,
  tryPlayUnix: PropTypes.number,
  isLocal: PropTypes.bool,
};

const Video = styled.video`
  width: 100%;
  height: 100%;
`;
export default Streamer;
