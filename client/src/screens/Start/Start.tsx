import React from "react";

import "./Start.css";


export function StartScreen(): JSX.Element {

    return (

        <div id="startScreen">
            <div id="startScreenBox">
                <div id="startScreenTitle">graviton</div>
                <img id="startScreenLogo" src={require("./images/logo.svg")} alt="Graviton Logo" draggable="false" />
            </div>
        </div>
    );
}
