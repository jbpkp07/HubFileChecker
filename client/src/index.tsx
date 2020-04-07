import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App/App";
import { ElectronAPI } from "../../shared/ElectronAPI";


declare const window: ElectronAPI.IWindow;

// tslint:disable-next-line: strict-type-predicates
if (window.electronAPI !== undefined) {

    // const currentWindow: ElectronAPI.IAppWindow = window.electronAPI.getCurrentWindow();
    console.log("blah123");
    window.electronAPI.resetZoomFactor(1);
}
console.log("blah456");
ReactDOM.render(<App />, document.getElementById("root"));
