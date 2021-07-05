import { useContext, useRef } from "react";
import { getFireStore } from "../resources/firebase.js";
import { useCallback } from "react";
import { StoreContext } from "../components/StoreProvider.js";
import { ADD_OPERATION_DATA } from "../ActionTypes.js";

const useFirebase = ({ isOffer, meetId }) => {
  const [, dispatch] = useContext(StoreContext);
  let offerCandidates = useRef();
  let answerCandidates = useRef();
  let callDoc = useRef();

  const setIceCandidate = useCallback(
    (candidate) => {
      const candidatesCollection = isOffer
        ? offerCandidates.current
        : answerCandidates.current;
      candidatesCollection.add(candidate);
    },
    [isOffer]
  );

  const setCallData = useCallback((data) => {
    callDoc.current.set(data);
  }, []);

  const updateCallData = useCallback((data) => {
    callDoc.current.update(data);
  }, []);

  const callDocOnSnapshot = useCallback((callback) => {
    callDoc.current.onSnapshot(callback);
  }, []);

  const remoteIceCandidateOnAdded = useCallback(
    (callback) => {
      const candidatesCollection = isOffer
        ? answerCandidates.current
        : offerCandidates.current;
      candidatesCollection.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data());
          }
        });
      });
    },
    [isOffer]
  );

  const getCallData = useCallback(
    async () => (await callDoc.current.get()).data(),
    []
  );

  const bootstrapWebRTCData = useCallback(() => {
    const firestore = getFireStore();
    const calls = firestore.collection("calls");

    callDoc.current = isOffer ? calls.doc() : calls.doc(meetId);
    offerCandidates.current = callDoc.current.collection("offerCandidates");
    answerCandidates.current = callDoc.current.collection("answerCandidates");
    console.log("id", callDoc.current.id);
    dispatch({
      type: ADD_OPERATION_DATA,
      data: { meetId: callDoc.current.id },
    });
  }, [meetId, isOffer, dispatch]);

  return {
    setIceCandidate,
    setCallData,
    callDocOnSnapshot,
    getCallData,
    updateCallData,
    remoteIceCandidateOnAdded,
    bootstrapWebRTCData,
  };
};
export default useFirebase;
