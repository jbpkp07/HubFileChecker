import jQuery from "jquery";
import React from "react";

import "./DataTable.css";
import { ITableKind } from "../DataTableAdaptor/DataTableAdaptor";
import "./datatables/datatables.css";
import "../TextBox/TextBox.css";


interface IJQuery extends JQueryStatic {

    DataTable?(opts?: DataTables.Settings): DataTables.Api;
}

const $: IJQuery = jQuery;

$.DataTable = require("datatables.net");

export interface IDataTableProps {

    allowRowDelete: boolean;
    columnDefClassName: string;
    columns: DataTables.ColumnSettings[];
    data: string[][];
    maxWidth: string;
    pageLength: number;
    positionLeft: string;
    positionTop: string;
    tableKind: keyof ITableKind;
    wrapperId: string;
    handleDeleteBtnClick?(tableKind: keyof ITableKind, _id: string): void;
}

export class DataTable extends React.Component<IDataTableProps> {

    public static readonly dataIdAttribute: string = "data-id";
    public static readonly deleteBtnClass: string = "dataTableDeleteBtn";

    public static getDeleteBtnElement = (_id: string): string => { 

        return `<div class="${DataTable.deleteBtnClass} button" ${DataTable.dataIdAttribute}="${_id}">Play</div>`;
    }

    private readonly wrapperClassName: string = "dataTableWrapper";
    private readonly tableId: string = "dataTable";
    
    private readonly baseSelector: string = `#${this.props.wrapperId}.${this.wrapperClassName}`;
    private readonly baseSelectorInner: string = `${this.baseSelector} > #${this.tableId}_wrapper`;

    private readonly initialTableElement: string = `<table id="${this.tableId}" />`;
    private readonly initialTableSelector: string = `${this.baseSelector} > #${this.tableId}`;

    private readonly searchTextBoxSelector: string = `${this.baseSelectorInner} > #${this.tableId}_filter > label > input`;
    private readonly sortBtnsSelector: string = `     ${this.baseSelectorInner} > #${this.tableId} > thead > tr > th`;
    private readonly deleteBtnsSelector: string = `   ${this.baseSelectorInner} > #${this.tableId} > tbody > tr > td > .${DataTable.deleteBtnClass}`;
    private readonly paginateBtnsSelector: string = ` ${this.baseSelectorInner} > #${this.tableId}_paginate > span > .paginate_button:not(.paginate_button.current)`;

    private dataTable: DataTables.Api | null = null;

    private prevColumns: DataTables.ColumnSettings[] | null = null;

    public readonly render = (): JSX.Element => {

        const cssProperties: React.CSSProperties = {

            left: this.props.positionLeft,
            maxWidth: this.props.maxWidth,
            top: this.props.positionTop
        };

        return (

            <div
                id={this.props.wrapperId}
                className={this.wrapperClassName}
                style={cssProperties}
            />
        );
    }

    public readonly componentDidMount = (): void => {

        // Deep copy because datatables.net modifies the columns array after createTable()
        this.prevColumns = JSON.parse(JSON.stringify(this.props.columns));

        this.createTable(this.props);
    }

    public readonly componentWillUnmount = (): void => {

        this.destroyTable();
    }

    public readonly shouldComponentUpdate = (nextProps: IDataTableProps): boolean => {

        if (JSON.stringify(nextProps.columns) !== JSON.stringify(this.prevColumns)) {  // Deep comparison

            this.prevColumns = JSON.parse(JSON.stringify(nextProps.columns)); // Deep copy
            
            this.createTable(nextProps);
        }
        else if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {  // Deep comparison
            
            this.reDrawTable(nextProps);
        }

        return false;  // Turn off React rendering, this table uses JQuery for DOM manipulation
    }

    private readonly createTable = (props: IDataTableProps): void => {

        this.destroyTable();

        let columnDefClassName: string = props.columnDefClassName;
        let columns: DataTables.ColumnSettings[] = props.columns;
        let data: string[][] = props.data;

        if (columns.length === 0) {

            columnDefClassName = "dt-center";
            columns = [{ title: "ERROR: No columns provided..." }];
            data = [[""]];
        }
        else if (data.length !== 0 && data.some((row: string[]) => row.length !== columns.length)) {

            columnDefClassName = "dt-center";
            columns = [{ title: "ERROR: Column and data count mismatch..." }];
            data = [[""]];
        }

        const tableSettings: DataTables.Settings = {

            autoWidth: false,
            columnDefs: [{
                className: columnDefClassName,
                targets: "_all"
            }],
            columns,
            data,
            info: false,
            lengthChange: false,
            pageLength: props.pageLength,
            pagingType: "numbers"
        };

        $(this.baseSelector).append(this.initialTableElement);

        this.dataTable = $(this.initialTableSelector).DataTable(tableSettings);

        $(this.searchTextBoxSelector) // Modify search text box for custom styling
            .addClass("textBox")
            .attr("id", "dataTableTextBox")
            .attr("type", "text")
            .attr("placeholder", "Search")
            .attr("spellcheck", "false");

        $(this.searchTextBoxSelector) // Remove search text box default label "Search:"
            .parent()
            .contents()
            .filter((_index: number, node: Node): boolean => node.nodeType === 3)
            .remove();

        this.assignAllListeners();
    }

    private readonly reDrawTable = (props: IDataTableProps): void => {

        if (this.dataTable === null ||
            props.columns.length === 0 || 
            props.data.some((row: string[]) => row.length !== props.columns.length)) {

            this.createTable(props);
        }
        else {

            this.dataTable.clear().rows.add(props.data).draw(false);

            this.assignAllListeners();
        }
    }

    private readonly destroyTable = (): void => {

        if (this.dataTable !== null) {

            this.removeAllListeners();

            this.dataTable.destroy(true);

            this.dataTable = null;
        }
    }

    private readonly assignAllListeners = (): void => {

        if (!this.props.allowRowDelete || this.dataTable === null) {

            return;
        }

        this.removeAllListeners();

        $(this.deleteBtnsSelector).one("click", this.handleDeleteBtnClick);

        $(this.searchTextBoxSelector).one("change", this.assignAllListeners);

        $(this.sortBtnsSelector).one("click", this.assignAllListeners);

        $(this.paginateBtnsSelector).one("click", this.assignAllListeners);
    }

    private readonly removeAllListeners = (): void => {

        if (!this.props.allowRowDelete || this.dataTable === null) {

            return;
        }

        $(this.deleteBtnsSelector).off("click", this.handleDeleteBtnClick);

        $(this.searchTextBoxSelector).off("change", this.assignAllListeners);

        $(this.sortBtnsSelector).off("click", this.assignAllListeners);

        $(this.paginateBtnsSelector).off("click", this.assignAllListeners);
    }

    private readonly handleDeleteBtnClick = (event: JQuery.ClickEvent): void => {
        console.log("here");
        const _id: string = event.target.dataset.id;

        if (this.props.handleDeleteBtnClick !== undefined) {

            // this.removeAllListeners();

            this.props.handleDeleteBtnClick(this.props.tableKind, _id);  // Table will be redrawn after server returns updated data
        }
        else if (this.dataTable !== null) {

            const rowToRemove: JQuery = $(`${this.deleteBtnsSelector}[${DataTable.dataIdAttribute}="${_id}"]`).parent("td").parent("tr");

            this.dataTable.row(rowToRemove).remove();

            this.dataTable.draw(false);

            this.assignAllListeners();
        }
    }
}
