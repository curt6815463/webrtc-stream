import { useState, useEffect } from "react";

const useConnection = () => {
  const [state, setConnectionState] = useState();
  useEffect(() => {
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
    const pc = new RTCPeerConnection(servers);
    setConnectionState(pc);
  }, []);
  return state;
};
export default useConnection;
