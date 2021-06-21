import { useEffect, useContext } from "react";
import { StoreContext } from "../components/StoreProvider.js";

const useSetRemoteStreamSource = (connection) => {
  const [, dispatch] = useContext(StoreContext);
  useEffect(() => {
    if (!connection || !dispatch) return;
    const remoteStream = new MediaStream();

    // Pull tracks from remote stream, add to video stream
    connection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        dispatch({
          type: "add-remote-stream-data",
          data: { streamSource: remoteStream.clone() },
        });
      });
    };
  }, [connection, dispatch]);
};
export default useSetRemoteStreamSource;
