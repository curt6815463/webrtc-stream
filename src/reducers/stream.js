const defaultState = {
  local: {},
  remote: {},
};

const stream = (state = defaultState, action) => {
  switch (action.type) {
    case "add-local-stream-data":
      return { ...state, local: action.data };
  }
};

export default stream;
