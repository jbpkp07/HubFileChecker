import { default as express } from "express";
import session, { SessionOptions } from "express-session";
import { terminal } from "terminal-kit";

import { config } from "./config/config";
import { Controller } from "./controller/Controller";
import { printHeader } from "./utils/printHeader";


printHeader();

const app: express.Application = express();

const sessionOptions: SessionOptions = {

    resave: false,
    saveUninitialized: true,
    secret: "35036ca3-7153-4b9a-a854-c21ceba18c5c" // random UUID for secret
};

const controller: Controller = new Controller();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(config.staticAssetsPath));
app.use(session(sessionOptions));
app.use(controller.router);

controller.connectDatabase()

    .then((successMsg: string) => {

        terminal.white(`  ${successMsg} ► `).brightGreen("Successful\n\n");

        app.listen(config.port, () => {

            terminal.white("  Webserver listening on port ► ").brightGreen(`${config.port}\n\n`);
        });
    })
    .catch((err: string) => {

        terminal.red(err);
    });
