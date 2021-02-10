import { render } from "./render.js";

export let state = {
  counter: 0,
};

/**
 * Get the current application state
 */
export function getState() {
  return state;
}

/**
 * @typedef {(state: typeof state, payload: unknown) => void} Reducer
 */

/**
 * Dispatches a state action
 * @param {unknown} action
 */
export function dispatch(action) {
  console.log("dispatching", action);
  window.dispatchEvent(new CustomEvent("state-change", { detail: action }));
}

/**
 * Builds a state reducer and rerenders on action
 * @param {keyof state} key -- the position in the state object
 * @param {Reducer} reducer
 */
function createReducer(key, reducer) {
  /**
   *
   * @param {CustomEvent} event
   */
  const listener = (event) => {
    const initial = state[key];
    state[key] = reducer(initial, event.detail);
    if (state[key] !== initial) {
      render();
    }
  };
  window.addEventListener("state-change", listener);
}

/**
 * Builds the state reducer tree
 * @param {{ [key: keyof state]: Reducer }} reducers
 */
export function combineReducers(reducers) {
  Object.entries(reducers).forEach(([key, reducer]) => {
    createReducer(key, reducer);
  });
}
