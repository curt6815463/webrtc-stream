import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../components/StoreProvider.js";
import { ADD_STREAM_DATA } from "../ActionTypes.js";

const useMediaStream = ({ isLocal, connection, shouldClose }) => {
  const [mediaStream, setMediaStream] = useState();
  const [, dispatch] = useContext(StoreContext);

  useEffect(() => {
    if (isLocal && !mediaStream) {
      const startStream = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          mediaStream.getTracks().forEach((track) => {
            connection.addTrack(track, mediaStream);
          });
          setMediaStream(mediaStream);
        } catch (error) {
          console.log(error);
        }
      };
      startStream();
    }

    if (!isLocal && !mediaStream) {
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
    return () => {
      if (mediaStream && shouldClose) {
        setMediaStream(null);
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [connection, isLocal, mediaStream, dispatch, shouldClose]);

  return mediaStream;
};
export default useMediaStream;
