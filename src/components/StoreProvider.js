import React, { createContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import stream, {
  defaultState as streamDefaultState,
} from "../reducers/stream.js";

export const StoreContext = createContext();
//https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
const combineReducers = (slices) => (state, action) => {
  return Object.keys(slices).reduce(
    // use for..in loop, if you prefer it
    (acc, prop) => {
      return {
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      };
    },
    state
  );
};

const initialState = { stream: streamDefaultState }; // some state for props a, b
const rootReducer = combineReducers({ stream });

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  // Important(!): memoize array value. Else all context consumers update on *every* render
  const store = useMemo(() => [state, dispatch], [state]);
  window.store = store;
  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
  );
};
StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
