import { render as r } from "./deps.js";
import { APP_ROOT } from "./constants.js";

console.time("render");

/**
 * Yes... its a singleton
 */
const renderMap = new Map();

/**
 *
 */
export function render() {
  console.timeLog("render");
  renderMap.forEach((_, key) => renderOnNextTick(key));
}

/**
 *
 * @param {string} key
 */
export async function renderComponent(key) {
  const { Component, props } = renderMap.get(key);
  const element = document.querySelector(`[data-render-id="${key}"]`);
  const res = await Component(props);
  r(res, element);
}

function renderOnNextTick(key) {
  requestAnimationFrame(() => {
    renderComponent(key);
  });
}

/**
 *
 * @param {string} key
 * @param {import('./stateful.js').Component} Component
 * @param {?Object} props
 */
export function register(key, Component, props) {
  if (renderMap.has(key)) {
    const c = renderMap.get(key);
    if (c.props.toString() === props.toString()) {
      // If the props havent changed then dont bother rerendering
      return c.Component;
    }
  }
  renderMap.set(key, {
    Component,
    props,
  });
  renderOnNextTick(key);
}

export function mount(Component, props = {}) {
  renderMap.set(APP_ROOT, {
    Component,
    props,
  });
  render();
}
