import React, { useContext, useState } from "react";
import styled from "styled-components";
import { StoreContext } from "../components/StoreProvider.js";
import { getFireStore } from "../resources/firebase.js";
import usePeerConnection from "../hook/usePeerConnection.js";
import useSetRemoteStreamSource from "../hook/useSetRemoteStreamSource.js";

const StreamController = () => {
  const [, dispatch] = useContext(StoreContext);
  const [callId, setCallId] = useState("");
  const [AnswerCallId, setAnswerCallId] = useState("");
  const connection = usePeerConnection();
  useSetRemoteStreamSource(connection);

  const openWebcam = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });
    dispatch({
      type: "add-local-stream-data",
      data: { streamSource: localStream },
    });
  };

  const callRemote = async () => {
    const firestore = getFireStore();
    const callDoc = firestore.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    setCallId(callDoc.id);
    connection.onicecandidate = (event) => {
      console.log("callRemote onicecandidate", event.candidate);
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    const offerDescription = await connection.createOffer();
    await connection.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      console.log("callRemote callDoc", data);
      if (!connection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        connection.setRemoteDescription(answerDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log("answerCandidates", change.doc.data());
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          console.log("call add ice", candidate);
          connection.addIceCandidate(candidate);
        }
      });
    });
  };

  const replyRemote = async () => {
    const callId = AnswerCallId;
    const firestore = getFireStore();
    const callDoc = firestore.collection("calls").doc(callId);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");
    connection.onicecandidate = (event) => {
      console.log("replyRemote onicecandidate", event.candidate);
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

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

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          console.log("answer add ice", data);
          connection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };
  return (
    <OpenWebController>
      <OpenWebButton onClick={openWebcam}>開啟攝影機</OpenWebButton>
      <CallRemoteButton onClick={callRemote}>撥打電話</CallRemoteButton>
      <CallIdLabel>{callId}</CallIdLabel>
      <AnswerRemoteButton onClick={replyRemote}>回覆遠端</AnswerRemoteButton>
      <AnswerCallIdInput
        onChange={(event) => setAnswerCallId(event.target.value)}
      ></AnswerCallIdInput>
    </OpenWebController>
  );
};

const OpenWebController = styled.div``;

const button = styled.button`
  background-color: rgb(234, 182, 118);
  width: 100%;
  margin-bottom: 20px;
`;

const CallIdLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const AnswerCallIdInput = styled.input`
  width: 100%;
  outline: none;
  box-sizing: border-box;
`;

const OpenWebButton = styled(button)`
  background-color: rgb(234, 182, 118);
  width: 100%;
  margin-bottom: 20px;
`;

const CallRemoteButton = styled(button)`
  background-color: rgb(234, 182, 118);
  width: 100%;
`;

const AnswerRemoteButton = styled(button)`
  background-color: rgb(234, 182, 118);
  width: 100%;
`;

export default StreamController;
