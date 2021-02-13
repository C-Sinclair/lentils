import { html, navigate } from "../../lib/index.js";

export function Page2() {
  return html`
    <h1>Page 2</h1>
    <button @click=${() => navigate("/")}>Page 1</button>
  `;
}
