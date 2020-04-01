import { IDataTableAdaptorProps } from "../../components/DataTableAdaptor/DataTableAdaptor";
import { FileCheckerScreen } from "./FileChecker";


export interface IFileCheckerComponentProps {

    dataTableAdaptorProps: IDataTableAdaptorProps;
}

export function getComponentProps(this: FileCheckerScreen): IFileCheckerComponentProps {

    const dataTableAdaptorProps: IDataTableAdaptorProps = {

        allowRowDelete: true,
        dataObjectArray: (this.state.lookups !== null) ? this.state.lookups.languages : null,
        handleDeleteBtnClick: this.handleDataTableDeleteBtnClick,
        maxWidth: "1200px",
        pageLength: 2,
        positionLeft: "220px",
        positionTop: "0px",
        tableKind: "languages",
        tableLayout: "ILookupLanguage",
        wrapperId: "fileCheckerScreenTable"
    };

    return {

        dataTableAdaptorProps
    };
}
