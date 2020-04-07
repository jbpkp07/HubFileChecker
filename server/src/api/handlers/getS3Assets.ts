import { Request, Response } from "express";

import { Controller } from "../../controller/Controller";
import { convertToS3Asset, IS3Asset, IS3AssetDoc } from "../../db/models/s3Assets";


const clientErr: string = "ERROR [api.getS3Assets()]:  \"Server could not retreive s3Assets from graviton database\"";

export function getS3Assets(this: Controller, _request: Request, response: Response): void {
    console.log(_request.connection.remoteAddress);
    console.log(_request.ip);


    const ip: string | string[] | undefined = _request.headers["x-forwarded-for"] || 
    _request.connection.remoteAddress || 
    _request.socket.remoteAddress;
    // (_request.connection.socket ? _request.connection.socket.remoteAddress : null);

    this.gravitonDatabase.s3AssetModel.find({}).exec()

        .then((s3AssetDocs: IS3AssetDoc[] | null) => {

            if (s3AssetDocs !== null) {

                const s3Assets: IS3Asset[] = [];

                for (const s3AssetDoc of s3AssetDocs) {

                    s3Assets.push(convertToS3Asset(s3AssetDoc));
                }

                // response.json(s3Assets);
                response.json(ip);
            }
            else {

                this.sendError(response, 500, clientErr);
            }
        })
        .catch((err: string) => {

            this.sendError(response, 500, clientErr, err);
        });
}
