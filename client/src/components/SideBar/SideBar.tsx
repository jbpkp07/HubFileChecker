import React from "react";

// import { Button, IButtonProps } from "../Button/Button";
import "./SideBar.css";


// export interface ISideBarProps {

//     currentScreen: EScreen;
//     selectScreen(screen: EScreen): void;
// }

// export function NavBar(props: ISideBarProps): JSX.Element {
export function SideBar(): JSX.Element {

    // function renderLink(screen: EScreen): JSX.Element {

    //     if (props.currentScreen === screen) {

    //         return (

    //             <div className="navBarLink navBarActiveLink" key={screen}>
    //                 {screen}
    //             </div>
    //         );
    //     }

    //     const buttonProps: IButtonProps = {

    //         className: "navBarLink navBarInActiveLink",
    //         id: "navButton",
    //         isActive: true,
    //         key: screen,
    //         label: screen,
    //         onClick: (): void => props.selectScreen(screen)
    //     };

    //     return (

    //         <Button {...buttonProps} />
    //     );
    // }

    return (

        <div id="sideBar">
            {/* {Object.values(EScreen).map(renderLink)} */}
        </div>
    );
}
