import { Request, Response } from "express";

import { API } from "../../../shared/API";
import { deleteLookupById } from "./handlers/deleteLookupById";
import { getLookups } from "./handlers/getLookups";
import { getS3Assets } from "./handlers/getS3Assets";


interface IApiServer extends API.IApi {

    deleteLookupById(request: Request, response: Response): void;
    getLookups(request: Request, response: Response): void;
    getS3Assets(request: Request, response: Response): void;
}

export const api: IApiServer = {

    deleteLookupById,
    getLookups,
    getS3Assets
};
