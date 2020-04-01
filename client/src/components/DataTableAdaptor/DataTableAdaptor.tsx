// tslint:disable: object-literal-sort-keys
import React from "react";

import { API } from "../../../../shared/API";
import { DataTable, IDataTableProps } from "../DataTable/DataTable";


interface IGenericObject {

    [key: string]: any;
}

export interface IDataTableAdaptorProps {

    allowRowDelete: boolean;
    dataObjectArray: IGenericObject[] | null;
    maxWidth: string;
    pageLength: number;
    positionLeft: string;
    positionTop: string;
    tableKind: keyof API.ILookupsKind;
    tableLayout: keyof API.ILookupType;
    wrapperId: string;
    handleDeleteBtnClick?(tableKind: keyof API.ILookupsKind, _id: string): void;
}

export class DataTableAdaptor extends React.Component<IDataTableAdaptorProps> {

    public readonly shouldComponentUpdate = (nextProps: IDataTableAdaptorProps): boolean => {

        if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {  // Deep compare

            return true;
        }

        return false;
    }

    public readonly render = (): JSX.Element => {
    
        const dataTableProps: IDataTableProps = {
    
            allowRowDelete: this.props.allowRowDelete,
            columnDefClassName: "dt-left",
            columns: [],
            data: [],
            handleDeleteBtnClick: this.props.handleDeleteBtnClick,
            maxWidth: this.props.maxWidth,
            pageLength: this.props.pageLength,
            positionLeft: this.props.positionLeft,
            positionTop: this.props.positionTop,
            tableKind: this.props.tableKind,
            wrapperId: this.props.wrapperId
        };

        if (this.props.dataObjectArray === null) {

            return this.renderLoadingTable(dataTableProps);
        }

        return this.renderTable(dataTableProps, this.props.dataObjectArray);
    }

    private readonly renderLoadingTable = (dataTableProps: IDataTableProps): JSX.Element => {
    
        dataTableProps.columnDefClassName = "dt-center";
        dataTableProps.columns = [{ title: "Loading..." }];
        dataTableProps.data = [[""]];

        return (

            <DataTable {...dataTableProps} />
        );
    }

    private readonly renderTable = (dataTableProps: IDataTableProps, dataObjectArray: IGenericObject[]): JSX.Element => {

        const columnKeys: string[] = this.getColumnKeys();

        const columns: DataTables.ColumnSettings[] = this.getColumns(columnKeys);

        const dataRows: string[][] = this.getDataRows(columnKeys, dataObjectArray);
    
        const doAllRowsHaveIds: boolean = !dataObjectArray.some((object: IGenericObject) => object["_id"] === undefined);

        if (columns.length > 0 && dataRows.length > 0 && doAllRowsHaveIds) {
    
            this.addDeleteButtons(columns, dataRows, dataObjectArray);
        }
        
        dataTableProps.columns = columns;
        dataTableProps.data = dataRows;

        return (
    
            <DataTable {...dataTableProps} />
        );
    }

    private readonly getColumnKeys = (): string[] => {
    
        switch (this.props.tableLayout) {
    
            case "ILookup": {
    
                const orderedKeys: API.ILookup = {

                    value: "",
                    label: "",
                    ordinal: 0
                };
                
                return Object.keys(orderedKeys);
            }
    
            case "ILookupLanguage": {
    
                const orderedKeys: API.ILookupLanguage = {
                    
                    value: "",
                    label: "",
                    languageName: "",
                    languageRegional: "",
                    iso639: "",
                    ordinal: 0
                };

                return Object.keys(orderedKeys);
            }
    
            default: {

                return [];
            }
        }
    }

    private readonly getColumns = (columnKeys: string[]): DataTables.ColumnSettings[] => {

        const columns: DataTables.ColumnSettings[] = [];

        columnKeys.forEach((key: string) => {
    
            const prettyTitle: string = key.replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, " $1").replace(/^./, (str: string) => str.toUpperCase());
    
            columns.push({ title: prettyTitle });
        });

        return columns;
    }

    private readonly getDataRows = (columnKeys: string[], dataObjectArray: IGenericObject[]): string[][] => {

        const dataRows: string[][] = [];
    
        dataObjectArray.forEach((object: IGenericObject) => {
    
            const row: string[] = [];
    
            columnKeys.forEach((key: string) => {

                if (object[key] !== undefined && object[key] !== "") {

                    row.push(object[key]);
                    // row.push(`<input data-prop="${key}" data-id="${object["_id"]}" class="textBox" value="${object[key]}">`);
                }
                else {

                    row.push("...");
                }
            });
    
            dataRows.push(row);
        });

        return dataRows;
    }

    private readonly addDeleteButtons = (columns: DataTables.ColumnSettings[], dataRows: string[][], dataObjectArray: IGenericObject[]): void => {

        if (this.props.allowRowDelete) {
    
            columns.push({ orderable: false, width: "30px" });

            for (let i: number = 0; i < dataObjectArray.length; i++) {

                dataRows[i].push(DataTable.getDeleteBtnElement(dataObjectArray[i]["_id"]));
            }
        }
    }
}
