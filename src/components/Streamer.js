import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

// import stream from '../reducers/stream.js';

const Streamer = ({ streamSource }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!streamSource || !videoRef) return;
    videoRef.current.srcObject = streamSource;
  }, [streamSource]);

  return <Video ref={videoRef}> </Video>;
};

Streamer.propTypes = {
  streamSource: PropTypes.object,
};

const Video = styled.video`
  width: 100%;
  height: 100%;
`;
export default Streamer;
