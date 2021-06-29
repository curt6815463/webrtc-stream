import React, { useContext } from "react";
import styled from "styled-components";
import Streamer from "../components/Streamer.js";
import { StoreContext } from "../components/StoreProvider.js";
// import StreamController from "../components/StreamController.js";
import usePeerConnection from "../hook/usePeerConnection.js";

const Home = () => {
  const [state] = useContext(StoreContext);
  const connection = usePeerConnection();

  // const isLocalActive = state.stream.local.isActive;
  const isRemoteActive = state.stream.remote.isActive;
  return (
    <HomeStyled>
      <StreamrWrapper>
        {connection && (
          <Streamer isLocal={true} connection={connection}></Streamer>
        )}
      </StreamrWrapper>
      {isRemoteActive && connection && (
        <StreamrWrapper>
          <Streamer isLocal={false} connection={connection}></Streamer>
        </StreamrWrapper>
      )}
      {/* <ControllerWrapper>
        <StreamController connection={connection} />
      </ControllerWrapper>
      <StreamrWrapper>
        {connection && (
          <Streamer
            isLocal={false}
            isActive={isRemoteActive}
            connection={connection}
          ></Streamer>
        )}
      </StreamrWrapper> */}
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const StreamrWrapper = styled.div`
  flex: 1;
  position: relative;
`;
// const ControllerWrapper = styled.div`
//   width: 200px;
// `;

export default Home;
