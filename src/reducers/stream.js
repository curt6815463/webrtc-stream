export const defaultState = {
  local: {},
  remote: {},
};

const stream = (state, action) => {
  switch (action.type) {
    case "add-local-stream-data":
      return { ...state, local: action.data };
  }
};

export default stream;
