import { IDataTableAdaptorProps } from "../../components/DataTableAdaptor/DataTableAdaptor";
import { FileCheckerScreen } from "./FileChecker";


export interface IFileCheckerComponentProps {

    dataTableAdaptorProps: IDataTableAdaptorProps;
}

export function getComponentProps(this: FileCheckerScreen): IFileCheckerComponentProps {

    const dataTableAdaptorProps: IDataTableAdaptorProps = {

        allowRowDelete: true,
        dataObjectArray: (this.state.s3Assets !== null) ? this.state.s3Assets : null,
        handleDeleteBtnClick: this.handleDataTableDeleteBtnClick,
        maxWidth: "1400px",
        pageLength: 5,
        positionLeft: "0px",
        positionTop: "0px",
        tableKind: "s3Assets",
        tableLayout: "s3Assets",
        wrapperId: "fileCheckerScreenTable"
    };

    return {

        dataTableAdaptorProps
    };
}
