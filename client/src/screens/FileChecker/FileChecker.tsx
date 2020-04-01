import { CancelTokenSource } from "axios";
import React from "react";

import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { getComponentProps, IFileCheckerComponentProps } from "./componentProps";
import { DataTableAdaptor } from "../../components/DataTableAdaptor/DataTableAdaptor";
import "./FileChecker.css";
import { SideBar } from "../../components/SideBar/SideBar";


interface IFileCheckerScreenState {

    lookups: API.ILookups | null;
}

let fileCheckerScreenState: IFileCheckerScreenState = {

    lookups: null
};

export class FileCheckerScreen extends React.Component {

    public readonly state: IFileCheckerScreenState = fileCheckerScreenState;

    private readonly apiCancelToken: CancelTokenSource = api.getNewCancelToken();

    public readonly render = (): JSX.Element => {

        const componentProps: IFileCheckerComponentProps = getComponentProps.call(this);

        return (

            <div id="fileCheckerScreen">
                <SideBar />
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps} />
            </div>
        );
    }

    public readonly componentDidMount = (): void => {

        api.getLookups(this.apiCancelToken)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }

    public readonly componentWillUnmount = (): void => {

        this.apiCancelToken.cancel("File Checker Screen");

        fileCheckerScreenState = this.state;
    }

    protected readonly handleDataTableDeleteBtnClick = (kind: keyof API.ILookupsKind, _id: string): void => {

        api.deleteLookupById(kind, _id, this.apiCancelToken)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }
}
