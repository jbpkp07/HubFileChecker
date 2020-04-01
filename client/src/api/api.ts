import Axios, { CancelTokenSource } from "axios";

import { API } from "../../../shared/API";
import { ITableKind } from "../components/DataTableAdaptor/DataTableAdaptor";
import { deleteLookupById } from "./handlers/deleteLookupById";
import { getLookups } from "./handlers/getLookups";
import { getS3Assets } from "./handlers/getS3Assets";


interface IApiClient extends API.IApi {

    deleteLookupById(kind: keyof ITableKind, _id: string, cancelToken: CancelTokenSource): Promise<API.ILookups>;
    getLookups(cancelToken: CancelTokenSource): Promise<API.ILookups>;
    getS3Assets(cancelToken: CancelTokenSource): Promise<API.IS3Asset[]>;

    getNewCancelToken(): CancelTokenSource;
}

export const api: IApiClient = {

    deleteLookupById,
    getLookups,
    getS3Assets,

    getNewCancelToken: (): CancelTokenSource => Axios.CancelToken.source()
};
