import produce from "immer";
import { ADD_STREAM_DATA } from "../ActionTypes.js";

export const defaultState = {
  local: {},
  remote: {},
};

const stream = produce((draftState, action) => {
  switch (action.type) {
    case ADD_STREAM_DATA:
      _ADD_STREAM_DATA(draftState, action.data);
      return;
  }
});

const _ADD_STREAM_DATA = (draftState, data) => {
  Object.entries(data).forEach(([key, value]) => {
    draftState[key] = value;
  });
};

export default stream;
