import { useEffect } from "react";
import { getFireStore } from "../resources/firebase.js";

const useWebRTCSetting = ({
  localMediaStream,
  remoteMediaStream,
  connection,
  meetId,
  isOffer,
}) => {
  useEffect(() => {
    if (!connection || !localMediaStream || !remoteMediaStream) return;
    const firestore = getFireStore();
    const calls = firestore.collection("calls");
    const callDoc = isOffer ? calls.doc() : calls.doc(meetId);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    if (isOffer) {
      console.log("meetId", callDoc.id);
    }

    connection.onicecandidate = (event) => {
      const candidatesCollection = isOffer ? offerCandidates : answerCandidates;
      event.candidate && candidatesCollection.add(event.candidate.toJSON());
    };

    const setOfferData = async () => {
      const offerDescription = await connection.createOffer();
      await connection.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });
    };

    const setRemoteDescription = () => {
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!connection.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          connection.setRemoteDescription(answerDescription);
        }
      });
    };

    const setAnswerData = async () => {
      const callData = (await callDoc.get()).data();

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

      await callDoc.update({ answer });
    };
    if (isOffer) {
      setOfferData();
      setRemoteDescription();
    } else {
      setAnswerData();
    }

    const setRemoteCandidate = () => {
      let candidateData = isOffer ? answerCandidates : offerCandidates;
      candidateData.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            connection.addIceCandidate(candidate);
          }
        });
      });
    };
    setRemoteCandidate();
  }, [connection, meetId, isOffer, localMediaStream, remoteMediaStream]);
};
export default useWebRTCSetting;
