import Electron from "electron";

declare global {
  interface Window {
    require: any;
  }
}

// because the backend imports this code for now...
const RendererElectron: Electron.AllElectron =
  typeof window === "undefined" ? null : window.require("electron");

export default RendererElectron;
