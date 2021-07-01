import React, { useContext } from "react";
import styled from "styled-components";
import Streamer from "../components/Streamer.js";
import { StoreContext } from "../components/StoreProvider.js";

import usePeerConnection from "../hook/usePeerConnection.js";
import useRemoteMediaStream from "../hook/useRemoteMediaStream.js";
import useLocalMediaStream from "../hook/useLocalMediaStream.js";
import { useParams } from "react-router-dom";
import useWebRTCSetting from "../hook/useWebRTCSetting.js";

const Meet = () => {
  const { meetId } = useParams();
  const [state] = useContext(StoreContext);
  const connection = usePeerConnection();

  const localMediaStream = useLocalMediaStream({ connection });
  const remoteMediaStream = useRemoteMediaStream({ connection });
  useWebRTCSetting({
    localMediaStream,
    remoteMediaStream,
    meetId,
    connection,
    isOffer: meetId === "create",
  });
  const isRemoteActive = state.stream.remote.isActive;
  return (
    <MeetStyled>
      {localMediaStream && (
        <StreamrWrapper>
          <Streamer mediaStream={localMediaStream}></Streamer>
        </StreamrWrapper>
      )}
      {isRemoteActive && (
        <StreamrWrapper>
          <Streamer mediaStream={remoteMediaStream}></Streamer>
        </StreamrWrapper>
      )}
    </MeetStyled>
  );
};

const MeetStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const StreamrWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export default Meet;
