import { useCallback } from "react";
import useFirebase from "../hook/useFirebase.js";

const useWebRTCSetting = ({ connection, meetId, isOffer }) => {
  const {
    setIceCandidate,
    setCallData,
    callDocOnSnapshot,
    getCallData,
    updateCallData,
    remoteIceCandidateOnAdded,
    bootstrapWebRTCData,
  } = useFirebase({ isOffer, meetId });
  const boostrapWebRTC = useCallback(() => {
    bootstrapWebRTCData();

    connection.onicecandidate = (event) => {
      event.candidate && setIceCandidate(event.candidate.toJSON());
    };

    const setOfferData = async () => {
      const offerDescription = await connection.createOffer();
      await connection.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
      setCallData({ offer });
    };

    const setAnswerData = async () => {
      const callData = await getCallData();

      const offerDescription = callData.offer;
      await connection.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );
      const answerDescription = await connection.createAnswer();
      await connection.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      updateCallData({ answer });
    };

    if (isOffer) {
      setOfferData();
      callDocOnSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!connection.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          connection.setRemoteDescription(answerDescription);
        }
      });
    } else {
      setAnswerData();
    }

    remoteIceCandidateOnAdded((remoteCandidate) => {
      const candidate = new RTCIceCandidate(remoteCandidate);
      connection.addIceCandidate(candidate);
    });
  }, [
    bootstrapWebRTCData,
    callDocOnSnapshot,
    connection,
    getCallData,
    isOffer,
    remoteIceCandidateOnAdded,
    setCallData,
    setIceCandidate,
    updateCallData,
  ]);
  return { boostrapWebRTC };
};
export default useWebRTCSetting;
