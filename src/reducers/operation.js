import produce from "immer";
import { ADD_OPERATION_DATA } from "../ActionTypes.js";

export const defaultState = {
  isShareModalOpen: true,
  meetId: "",
};

const operation = produce((draftState = defaultState, action) => {
  switch (action.type) {
    case ADD_OPERATION_DATA:
      _ADD_OPERATION_DATA(draftState, action.data);
      return;
  }
});

const _ADD_OPERATION_DATA = (draftState, data) => {
  Object.entries(data).forEach(([key, value]) => {
    draftState[key] = value;
  });
};

export default operation;
