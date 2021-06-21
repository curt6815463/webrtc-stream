import { useState, useEffect } from "react";

const usePeerConnection = () => {
  const [peerConnection, setPeerConnection] = useState();
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
    setPeerConnection(pc);
  }, []);
  return peerConnection;
};
export default usePeerConnection;
