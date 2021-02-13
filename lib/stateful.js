import { html } from "./deps.js";
import { useState } from "./local-state.js";
import { register } from "./render.js";

/**
 * Wraps a component and passes it a the useState hook
 * One drawback is the component is wrapped with a div
 * @template A
 * @param {import('./types').StatefulComponent<A>} Component
 * @param {?string} key -- key to store instance against
 * @param {HTMLElement} root -- html element root
 */
export function Stateful(Component, key = generateKey()) {
  const C = (props) =>
    Component({
      ...props,
      useState: (init) => useState(init, key),
    });
  return (props) => {
    register(key, C, props);
    return html`<div data-render-id=${key}></div>`;
  };
}

/**
 * @returns {string}
 */
export function generateKey() {
  const arr = new Uint8Array(10);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

/**
 *
 * @param {number} dec
 * @returns {string}
 */
function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}
