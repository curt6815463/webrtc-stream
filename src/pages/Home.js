import React, { useContext } from "react";
import styled from "styled-components";
import Streamer from "../components/Streamer.js";
import { StoreContext } from "../components/StoreProvider.js";
import StreamController from "../components/StreamController.js";

const Home = () => {
  const [state] = useContext(StoreContext);
  const localStreamSource = state.stream.local.streamSource;
  const remoteStreamSource = state.stream.remote.streamSource;
  const tryPlayUnix = state.stream.remote.tryPlayUnix;
  return (
    <HomeStyled>
      <StreamrWrapper>
        <Streamer isLocal streamSource={localStreamSource}></Streamer>
      </StreamrWrapper>
      <ControllerWrapper>
        <StreamController />
      </ControllerWrapper>
      <StreamrWrapper>
        <Streamer
          streamSource={remoteStreamSource}
          tryPlayUnix={tryPlayUnix}
        ></Streamer>
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

export default Home;
