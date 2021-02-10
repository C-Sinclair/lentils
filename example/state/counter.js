import { dispatch, getState } from "despot";

export const counter = () => getState().counter;

export const increment = () => dispatch({ type: "increment" });
export const decrement = () => dispatch({ type: "decrement" });
export const set = (value) =>
  dispatch({ type: "set", payload: parseInt(value) });

/**
 *
 * @param {number} state
 * @param {Object} action
 * @param {"increment" | "decrement" | "set"} action.type
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "set":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
