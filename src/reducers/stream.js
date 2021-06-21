export const defaultState = {
  local: {},
  remote: {},
};

const stream = (state, action) => {
  switch (action.type) {
    case "add-local-stream-data":
      return { ...state, local: { ...state.local, ...action.data } };
    case "add-remote-stream-data":
      return { ...state, remote: { ...state.remote, ...action.data } };
  }
};

export default stream;
