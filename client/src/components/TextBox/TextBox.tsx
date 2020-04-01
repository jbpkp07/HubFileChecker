import React, { ChangeEvent } from "react";

import "./TextBox.css";


export interface ITextBoxProps {

    className?: string;
    id: string;
    isActive: boolean;
    key?: string;
    placeholder: string;
    positionLeft?: string;
    positionTop?: string;
    title?: string;
    width?: string;
    onChange(id: string, value: string): void;
}

export function TextBox(props: ITextBoxProps): JSX.Element {

    const textBoxClass: string = (props.isActive) ? "textBox" : "textBoxInactive";

    const className: string = (props.className !== undefined) ? `${props.className} ${textBoxClass}` : `${textBoxClass}`;

    function onChange(event: ChangeEvent<HTMLInputElement>): void {

        props.onChange(props.id, event.target.value);
    }

    return (
        
        <input 
            id={props.id}
            className={className}
            style={{ left: props.positionLeft, top: props.positionTop, width: props.width }}
            placeholder={props.placeholder}
            title={props.title}
            disabled={!props.isActive}
            onChange={onChange}
            type="text"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
        />   
    );
}
