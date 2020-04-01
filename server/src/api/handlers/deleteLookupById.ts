import { Request, Response } from "express";

import { Controller } from "../../controller/Controller";
import { convertToILookups, ILookups, ILookupsDoc, ILookupsKind } from "../../db/models/lookups";


const clientErr: string = "ERROR [api.deleteLookupById()]:  \"Server could not delete lookup entry from graviton database\"";

const kinds: ILookupsKind = {

    aspectRatios: "aspectRatios",
    languages: "languages",
    versions: "versions"
};

export function deleteLookupById(this: Controller, request: Request, response: Response): void {

    const _id: string = request.params._id;

    const kind: string = request.params.kind;
    
    if (!Object.values(kinds).some((value: string) => value === kind)) {

        this.sendError(response, 500, clientErr);

        return;
    }

    const options: object[] = [

        {},
        { $pull: { [kind]: { _id } } },
        { new: true, useFindAndModify: false }
    ];

    // @ts-ignore  (Typescript doesn't like the spread operator "..." for function params)
    this.gravitonDatabase.lookupsModel.findOneAndUpdate(...options).exec()

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
