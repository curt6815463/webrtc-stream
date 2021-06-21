import firebase from "firebase/app";
import "firebase/firestore";

let fireStore = undefined;

export const initialize = () => {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: "AIzaSyDYlepDnqvE6YjB5kVYNpEX5MxHvv5K3X4",
      authDomain: "webrtc-stream-ca50b.firebaseapp.com",
      projectId: "webrtc-stream-ca50b",
      storageBucket: "webrtc-stream-ca50b.appspot.com",
      messagingSenderId: "357979108148",
      appId: "1:357979108148:web:781702de0e85d4aa1a2b61",
      measurementId: "G-DY1NHL3T4F",
    };
    firebase.initializeApp(firebaseConfig);
  }
};

export const getFireStore = () => {
  if (fireStore) return fireStore;
  fireStore = firebase.firestore();
  return fireStore;
};
