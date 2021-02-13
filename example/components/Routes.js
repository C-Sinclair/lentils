import { html, Router } from "../../lib/index.js";

const pageList = [
  {
    importer: async () => {
      const { Page1 } = await import("./Page1.js");
      return Page1;
    },
    path: "/",
    title: "Page Uno",
  },
  {
    importer: async () => {
      const { Page2 } = await import("./Page2.js");
      return Page2;
    },
    path: "/",
    title: "Page Duo",
  },
];

export const Routes = Router({ routes: pageList });
