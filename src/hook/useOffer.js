import { useEffect } from "react";
import { getFireStore } from "../resources/firebase.js";

const useOffer = ({ connection }) => {
  useEffect(() => {
    const firestore = getFireStore();
    const callDoc = firestore.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    const getOfferDescription = async () => await connection.createOffer();

    const setOfferData = async () => {
      const offerDescription = await getOfferDescription();
      await connection.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });
    };

    setOfferData();

    connection.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!connection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        connection.setRemoteDescription(answerDescription);
      }
    });
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          connection.addIceCandidate(candidate);
        }
      });
    });
  }, [connection]);
};
export default useOffer;
