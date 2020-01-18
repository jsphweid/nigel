import Electron from "electron";

declare global {
  interface Window {
    require: any;
  }
}

const RendererElectron: Electron.AllElectron = window.require("electron");

export default RendererElectron;
