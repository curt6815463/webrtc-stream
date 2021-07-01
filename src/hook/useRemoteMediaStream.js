import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../components/StoreProvider.js";
import { ADD_STREAM_DATA } from "../ActionTypes.js";

const useRemoteMediaStream = ({ connection }) => {
  const [mediaStream, setMediaStream] = useState();
  const [, dispatch] = useContext(StoreContext);

  useEffect(() => {
    if (!mediaStream && connection) {
      const mediaStream = new MediaStream();
      setMediaStream(mediaStream);
      connection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          mediaStream.addTrack(track);
        });
        dispatch({
          type: ADD_STREAM_DATA,
          data: { remote: { isActive: true } },
        });
      };
    }
  }, [mediaStream, dispatch, connection]);
  return mediaStream;
};

export default useRemoteMediaStream;
