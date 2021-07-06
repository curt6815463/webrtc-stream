import { useState, useEffect } from "react";

const useLocalMediaStream = ({ connection }) => {
  const [mediaStream, setMediaStream] = useState();
  useEffect(() => {
    if (!mediaStream && connection) {
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
        } catch (e) {
          return e;
        }
      };
      startStream();
    }
  }, [mediaStream, connection]);
  return mediaStream;
};

export default useLocalMediaStream;
