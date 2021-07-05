import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Streamer from "../components/Streamer.js";
import { StoreContext } from "../components/StoreProvider.js";

import usePeerConnection from "../hook/usePeerConnection.js";
import useRemoteMediaStream from "../hook/useRemoteMediaStream.js";
import useLocalMediaStream from "../hook/useLocalMediaStream.js";
import { useParams } from "react-router-dom";
import useWebRTCSetting from "../hook/useWebRTCSetting.js";
import ShareModal from "../components/ShareModal.js";

const Meet = () => {
  const { meetId } = useParams();
  const [state] = useContext(StoreContext);
  const { getConnection } = usePeerConnection();
  const connection = getConnection();

  const localMediaStream = useLocalMediaStream({ connection });
  const remoteMediaStream = useRemoteMediaStream({ connection });

  const { boostrapWebRTC } = useWebRTCSetting({
    localMediaStream,
    remoteMediaStream,
    meetId,
    connection,
    isOffer: meetId === "create",
  });

  useEffect(() => {
    if (localMediaStream && remoteMediaStream) {
      boostrapWebRTC();
    }
  }, [boostrapWebRTC, localMediaStream, remoteMediaStream]);

  const isRemoteActive = state.stream.remote.isActive;
  const isShareModalOpen = state.operation.isShareModalOpen;
  return (
    <MeetStyled>
      {isShareModalOpen && !isRemoteActive && <ShareModal />}
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
