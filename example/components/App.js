import { counter, decrement, increment, set } from "../state/counter.js";
import { useState, html } from "despot";
import { Header } from "./Header.js";

export const App = () => {
  const title = "Awesome P.O.V";
  const [show, setShow] = useState(false, "app-root");

  return html`
    <style>
      main {
        padding: 100px;
      }
      p {
        color: var(--color);
      }
    </style>
    <main>
      ${Header({ title })}

      <section>
        ${show
          ? html`<input
              .value=${counter()}
              @change=${(e) => set(e.target.value)}
              type="number"
            />`
          : html`<h6>${counter()}</h6>`}

        <button @click=${() => setShow(!show)}>Togg</button>

        <button @click=${increment}>+</button>
        <button @click=${decrement}>-</button>
      </section>
    </main>
  `;
};
