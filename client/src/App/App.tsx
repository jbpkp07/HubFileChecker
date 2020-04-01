import React from "react";

import "./App.css";
import { EScreen } from "../screens/EScreen";
import { FileCheckerScreen } from "../screens/FileChecker/FileChecker";
import { INavBarProps, NavBar } from "../components/NavBar/NavBar";
import { StartScreen } from "../screens/Start/Start";
import { TitleBar } from "../components/TitleBar/TitleBar";


interface IAppState {

    currentScreen: EScreen;
}

export class App extends React.Component {

    public readonly state: IAppState = {

        currentScreen: EScreen.Start
    };

    public readonly render = (): JSX.Element => {

        const navBarProps: INavBarProps = {
            
            currentScreen: this.state.currentScreen,
            selectScreen: this.selectScreen
        };

        return (

            <div id="app">
                <TitleBar />
                <NavBar {...navBarProps} />
                <div id="appScreenWrapper">
                    {this.renderScreen()}
                </div>
            </div>
        );
    }

    private readonly renderScreen = (): JSX.Element => {

        switch (this.state.currentScreen) {

            case EScreen.Start:
                return (<StartScreen />);

            case EScreen.FileChecker:
                return (<FileCheckerScreen />);

            default:
                return (<StartScreen />);
        }
    }

    private readonly selectScreen = (currentScreen: EScreen): void => {

        this.setState({ currentScreen });
    }
}
