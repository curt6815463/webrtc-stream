import firebase from "firebase/app";
import "firebase/firestore";

let fireStore = undefined;

export const initialize = () => {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      // your config
    };
    firebase.initializeApp(firebaseConfig);
  }
};

export const getFireStore = () => {
  if (fireStore) return fireStore;
  fireStore = firebase.firestore();
  return fireStore;
};
