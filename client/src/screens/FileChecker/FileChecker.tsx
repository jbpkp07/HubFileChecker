import { CancelTokenSource } from "axios";
import React from "react";

import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { getComponentProps, IFileCheckerComponentProps } from "./componentProps";
import { DataTableAdaptor } from "../../components/DataTableAdaptor/DataTableAdaptor";
import "./FileChecker.css";


interface IFileCheckerScreenState {

    lookups: API.ILookups | null;
    s3Assets: API.IS3Asset[] | null;
}

let fileCheckerScreenState: IFileCheckerScreenState = {

    lookups: null,
    s3Assets: null
};

export class FileCheckerScreen extends React.Component {

    public readonly state: IFileCheckerScreenState = fileCheckerScreenState;

    private readonly apiCancelToken: CancelTokenSource = api.getNewCancelToken();

    public readonly render = (): JSX.Element => {

        const componentProps: IFileCheckerComponentProps = getComponentProps.call(this);

        return (

            <div id="fileCheckerScreen">
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps} />
            </div>
        );
    }

    public readonly componentDidMount = async (): Promise<void> => {

        const dataFetch: [Promise<API.ILookups>, Promise<API.IS3Asset[]>] = [

            api.getLookups(this.apiCancelToken), 
            api.getS3Assets(this.apiCancelToken)
        ];

        const data: [API.ILookups, API.IS3Asset[]] = await Promise.all(dataFetch);
        
        this.setState({

            lookups: data[0],
            s3Assets: data[1]
        });

        console.log(data[0]);
        console.log(data[1]);


        // api.getLookups(this.apiCancelToken)

        //     .then((lookups: API.ILookups) => {

        //         this.setState({ lookups });
        //     });

        // api.getS3Assets(this.apiCancelToken)

        //     .then((s3Assets: API.IS3Asset[]) => {

        //         console.log(s3Assets);
        //     });
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
