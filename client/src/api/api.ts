import Axios, { CancelTokenSource } from "axios";

import { API } from "../../../shared/API";
import { deleteLookupById } from "./handlers/deleteLookupById";
import { getLookups } from "./handlers/getLookups";


interface IApiClient extends API.IApi {

    deleteLookupById(kind: keyof API.ILookupsKind, _id: string, cancelToken: CancelTokenSource): Promise<API.ILookups>;
    getLookups(cancelToken: CancelTokenSource): Promise<API.ILookups>;
    getNewCancelToken(): CancelTokenSource;
}

export const api: IApiClient = {

    deleteLookupById,
    getLookups,
    getNewCancelToken: (): CancelTokenSource => Axios.CancelToken.source()
};
