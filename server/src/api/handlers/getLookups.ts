import { Request, Response } from "express";

import { Controller } from "../../controller/Controller";
import { convertToILookups, ILookups, ILookupsDoc } from "../../db/models/lookups";


const clientErr: string = "ERROR [api.getLookups()]:  \"Server could not retreive lookups object from graviton database\"";

export function getLookups(this: Controller, _request: Request, response: Response): void {

    this.gravitonDatabase.lookupsModel.findOne().exec()

        .then((lookupsDoc: ILookupsDoc | null) => {

            if (lookupsDoc !== null) {

                const lookups: ILookups = convertToILookups(lookupsDoc);

                response.json(lookups);
            }
            else {

                this.sendError(response, 500, clientErr);
            }
        })
        .catch((err: string) => {

            this.sendError(response, 500, clientErr, err);
        });
}
