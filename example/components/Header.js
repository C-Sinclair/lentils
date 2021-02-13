import { Stateful, html, render } from "../../lib/index.js";

export const Header = Stateful(({ title, useState }) => {
  const [show, setShow] = useState(false);
  return html`
    <header>${title}</header>

    <p>${show ? "show" : "no show"}</p>

    <button @click=${() => setShow(!show)}>Clickkker</button>
  `;
});
