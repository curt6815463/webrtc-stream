import React, { useRef, useEffect, useReducer } from "react";
import styled from "styled-components";
import stream from "../reducers/stream.js";

const Streamer = ({ streamSource }) => {
  const videoRef = useRef(null);
  const [state] = useReducer(stream);
  console.log("streamer", state);
  useEffect(() => {
    console.log("Streamer", state);
    if (!streamSource || !videoRef) return;
    videoRef.current.srcObject = streamSource;
  }, [streamSource]);

  return <Video ref={videoRef}></Video>;
};
const Video = styled.video`
  width: 100%;
  height: 100%;
`;
export default Streamer;
