import { html } from "./deps.js";
import { register, renderComponent } from "./render.js";
import { generateKey } from "./stateful.js";

/**
 * @typedef {import('./types').RouteComponent} RouteComponent
 *
 * @typedef {object} RouterProp
 * @property {() => Promise<RouteComponent>} RouterProp.importer
 * @property {string} RouterProp.path
 * @property {string} RouterProp.title
 */

/**
 * Dynamically imports the correct component and renders it beneath this root component
 * @param {object} props
 * @param {RouterProp[]} props.routes
 * @param {?object} props.options
 * @param {?string} props.options.to -- pathname to rerender to
 * @param {?string} props.options.key -- router instance key
 * @param {?string} props.options.fallback -- fallback component
 * @returns {import('./types').RouteComponent}
 */
export function Router(props) {
  const { routes, options = {} } = props;
  const current = options.to || window.location.pathname;
  const key = options.key || generateKey();

  let route;

  for (const r of routes) {
    if (current === r.path) {
      route = r;
    }
  }

  if (!route) {
    route = {
      importer: options.fallback,
      title: "Page Not Found",
      path: "/404",
    };
  }

  const { importer, title, path } = route;
  window.history.pushState({}, title);

  const R = (props) =>
    Router({ ...props, options: { ...(props?.options ?? {}), key } });

  return (props) => {
    register(key, R, props);
    registerRoute(path, importer, { path, title });
    return html`<div data-render-id=${key} data-router-root>
      <div data-render-id=${path}></div>
    </div>`;
  };
}

/**
 *
 * @param {string} path
 * @param {() => Promise<RouteComponent>} importer
 * @param {object} props
 */
async function registerRoute(path, importer, props) {
  const component = await importer();
  register(path, component, props);
}

// function Route(Component, path) {
//   register(path, Component);
//   return html`<div data-render-id=${path} data-path-root></div>`;
// }

/**
 *
 * @param {string} path
 */
export function navigate(path) {
  renderComponent(path);
}
