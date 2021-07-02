import { useRef } from "react";

const usePeerConnection = () => {
  const connection = useRef();

  const setupConnection = () => {
    const servers = {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };
    connection.current = new RTCPeerConnection(servers);
  };

  const getConnection = () => {
    if (!connection.current) {
      setupConnection();
    }
    return connection.current;
  };

  return { getConnection };
};
export default usePeerConnection;
