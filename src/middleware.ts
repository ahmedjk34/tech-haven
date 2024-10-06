export { auth as middleware } from "@/auth";

export const config = {
  unstable_allowDynamic: [
    "/node_modules/@mongodb-js",
    "/node_modules/@mongoose/dist/browser.umd.js",
  ],
};
