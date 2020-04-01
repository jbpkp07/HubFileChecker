import React from "react";

import "./Button.css";


export interface IButtonProps {

    className?: string;
    id: string;
    isActive: boolean;
    key?: string;
    label: string;
    positionLeft?: string;
    positionTop?: string;
    onClick(id: string): void;
}

export function Button(props: IButtonProps): JSX.Element {

    const buttonClass: string = (props.isActive) ? "button" : "buttonInactive";

    const className: string = (props.className !== undefined) ? `${props.className} ${buttonClass}` : `${buttonClass}`;

    function onClick(): void {

        props.onClick(props.id);
    }

    return (

        <div
            id={props.id} 
            className={className} 
            key={props.id}
            style={{ left: props.positionLeft, top: props.positionTop }}
            onClick={(props.isActive) ? onClick : undefined}
        >
            {props.label}
        </div>
    );
}
