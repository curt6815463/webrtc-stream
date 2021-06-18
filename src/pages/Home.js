import React, { useReducer } from "react";
import styled from "styled-components";
import Streamer from "../components/Streamer.js";
import stream from "../reducers/stream.js";

const Home = () => {
  const [state, dispatch] = useReducer(stream);
  console.log("home", state);
  const openWebcam = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    dispatch({
      type: "add-local-stream-data",
      data: { streamSource: localStream },
    });
    // Push tracks from local stream to peer connection
    // localStream.getTracks().forEach((track) => {
    //   pc.addTrack(track, localStream);
    // });

    // Show stream in HTML video
    // webcamVideo.srcObject = localStream;
  };
  return (
    <HomeStyled>
      <StreamrWrapper>
        <Streamer></Streamer>
      </StreamrWrapper>
      <ControllerWrapper>
        <OpenWebController>
          <OpenWebButton onClick={() => openWebcam()}>開啟攝影機</OpenWebButton>
        </OpenWebController>
      </ControllerWrapper>
      <StreamrWrapper>
        <Streamer></Streamer>
      </StreamrWrapper>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  display: flex;
  height: 100%;
`;
const StreamrWrapper = styled.div`
  flex: 1;
`;
const ControllerWrapper = styled.div`
  width: 200px;
`;
const OpenWebController = styled.div``;

const OpenWebButton = styled.button`
  background-color: rgb(234, 182, 118);
  width: 100%;
`;

export default Home;
