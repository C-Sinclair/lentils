import { Stateful, html } from "despot";

export const Header = Stateful(({ title, useState }) => {
  const [show, setShow] = useState(false);
  return html`
    <header>${title}</header>

    <p>${show ? "show" : "no show"}</p>

    <button @click=${() => setShow(!show)}>Clickkker</button>
  `;
});
