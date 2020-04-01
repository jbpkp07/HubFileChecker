import { default as express, Request, Response } from "express";
import { terminal } from "terminal-kit";

import { api } from "../api/api";
import { config } from "../config/config";
import { GravitonDatabase } from "../db/GravitonDatabase";


export class Controller {

    public readonly router: express.Router = express.Router();

    public readonly gravitonDatabase: GravitonDatabase = new GravitonDatabase();

    public constructor() {

        this.router.route("/")
            .get(this.sendClientApp.bind(this));

        this.router.route("/api/lookups")
            .get(api.getLookups.bind(this));

        this.router.route("/api/lookups/:kind/:_id")
            .delete(api.deleteLookupById.bind(this));
    }

    public async connectDatabase(): Promise<string> {

        return this.gravitonDatabase.connectDatabase();
    }
    
    protected sendError(response: Response, statusCode: number, clientErr: string, caughtErr?: string): void {

        terminal.red(`  ${clientErr}\n\n`);

        if (caughtErr !== undefined) {

            terminal.gray(`  ${caughtErr}\n\n`);
        }

        response.statusMessage = clientErr;

        response.sendStatus(statusCode);
    }

    private sendClientApp(_request: Request, response: Response): void {

        response.sendFile(config.htmlAssetPath);
    }
}
