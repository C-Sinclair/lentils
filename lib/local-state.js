//@ts-check

import { renderComponent } from "./render.js";

/**
 * @template A
 * @typedef {(s: A) => A} StateSetter
 * @typedef {Map<string, [A, StateSetter<A>]>} StateMap
 *
 */

/**
 * @template A
 * @type {StateMap<A>}
 */
const statesMap = new Map();

/**
 * Reactive state function
 * If using this directly, each component will need a unique key to indentify it between renders
 *
 * @function
 * @param {A} initialState
 * @param {string} key
 * @returns {[A, Function]}
 */
export function useState(initialState, key) {
  /**
   * @type {StateSetter<A>}
   */
  const setState = (s) => {
    const currentState = statesMap.get(key);
    const newState = typeof s === "function" ? s(currentState[0]) : s;
    if (newState !== currentState[0]) {
      currentState[0] = newState;
      renderComponent(key);
    }
  };
  const current = statesMap.get(key) || [initialState, setState];

  statesMap.set(key, current);

  return current;
}
