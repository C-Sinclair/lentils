import { html, navigate } from "../../lib/index.js";

export function Page1() {
  return html`
    <h1>Page 1</h1>
    <button @click=${() => navigate("/page-2")}>Page 2</button>
  `;
}
