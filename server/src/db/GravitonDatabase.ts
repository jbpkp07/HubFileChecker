import mongoose, { ConnectionOptions, Model } from "mongoose";

import { config } from "../config/config";
import { ILookups, ILookupsDoc, lookupsModel } from "./models/lookups";
import { IS3Asset, IS3AssetDoc, s3AssetsModel } from "./models/s3Assets";

export class GravitonDatabase {

    public readonly lookupsModel: Model<ILookupsDoc> = lookupsModel;
    public readonly s3AssetModel: Model<IS3AssetDoc> = s3AssetsModel;

    public async connectDatabase(): Promise<string> {

        return new Promise((resolve: Function, reject: Function): void => {

            const options: ConnectionOptions = {

                useCreateIndex: true,    // prevents deprecation warning
                useNewUrlParser: true,
                useUnifiedTopology: true // prevents deprecation warning
            };

            mongoose.connect(config.MONGODB_URI, options)

                .then((_connection: typeof mongoose) => {

                    // console.log(_connection.connections);
                    // this.addTestLookups();
                    // this.addTestS3Assets();
                    
                    resolve("Graviton database connected");
                })
                .catch((err: string) => {

                    reject(err);
                });
        });
    }

    protected addTestS3Assets(): void {

        const newAsset: IS3Asset = {

            client: "client",
            cycle: "cycle",
            facilisPath: "facilis path",
            facilisSize: 123456,
            fileName: "filename",
            notes: "a note here",
            preSignedProxyUrl: "proxy url",
            preSignedUrl: "url",
            qcChecked: false
        };

        this.s3AssetModel.create(newAsset)

            .catch((err: string) => {

                console.log(err);
            });
    }


    protected addTestLookups(): void {

        const lookups: ILookups = {

            aspectRatios: [
                { label: "14 x 3", ordinal: 1, value: "4x3" },
                { label: "26 x 9", ordinal: 3, value: "16x9" },
                { label: "36 x 10", ordinal: 2, value: "16x10" },
                { label: "44 x 3", ordinal: 1, value: "4x3" },
                { label: "58 x 9", ordinal: 3, value: "16x9" },
                { label: "60 x 10", ordinal: 2, value: "16x10" },
                { label: "7 x 3", ordinal: 1, value: "4x3" },
                { label: "86 x 9", ordinal: 3, value: "16x9" },
                { label: "96 x 10", ordinal: 2, value: "16x10" },
                { label: "a4 x 3", ordinal: 1, value: "4x3" },
                { label: "b8 x 9", ordinal: 3, value: "16x9" },
                { label: "c0 x 10", ordinal: 2, value: "16x10" }
            ],
            languages: [
                {
                    iso639: "eng",
                    label: "ENG",
                    languageName: "English",
                    languageRegional: "en-US",
                    ordinal: 1,
                    value: "1ENG"
                },
                {
                    iso639: "eng",
                    label: "ENG",
                    languageName: "English",
                    languageRegional: "en-US",
                    ordinal: 1,
                    value: "2ENG"
                },
                {
                    iso639: "eng",
                    label: "ENG",
                    languageName: "English",
                    languageRegional: "en-US",
                    ordinal: 1,
                    value: "3ENG"
                },
                {
                    iso639: "eng",
                    label: "ENG",
                    languageName: "English",
                    languageRegional: "en-US",
                    ordinal: 1,
                    value: "4ENG"
                },
                {
                    iso639: "eng",
                    label: "ENG",
                    languageName: "English",
                    languageRegional: "en-US",
                    ordinal: 1,
                    value: "5ENG"
                },
                {
                    iso639: "eng",
                    label: "ENG",
                    languageName: "English",
                    languageRegional: "en-US",
                    ordinal: 1,
                    value: "6ENG"
                }
            ],
            versions: [
                { label: "Theatrical", ordinal: 2, value: "T" },
                { label: "Edited3", value: "E", ordinal: 1 }
            ]
        };

        this.lookupsModel.create(lookups)

            .catch((err: string) => {

                console.log(err);
            });
    }
}
