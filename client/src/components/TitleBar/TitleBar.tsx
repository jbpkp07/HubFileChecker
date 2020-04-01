import React from "react";

import "./TitleBar.css";


export function TitleBar(): JSX.Element {

    return (

        <div id="titleBar" className="titleBarDrag">
            <div id="titleBarLogo" className="titleBarDrag">
                <span id="titleBarLogoText" className="titleBarText titleBarDrag">spafax</span>
            </div>
            <div id="titleBarTitle" className="titleBarDrag">
                <span className="titleBarText titleBarDrag">graviton</span>
            </div>
            <div id="titleBarBtnsBox">
                {/* <img src={require("./images/minimize.svg")} alt="Min"   title="Minimize"           className="titleBarBtn" draggable="false" /> */}
                {/* <img src={require("./images/maximize.svg")} alt="Max"   title="Maximize / Restore" className="titleBarBtn" draggable="false" /> */}
                {/* <img src={require("./images/close.svg")}    alt="Close" title="Close"              className="titleBarBtn" draggable="false" /> */}
            </div>
        </div>
    );
}
