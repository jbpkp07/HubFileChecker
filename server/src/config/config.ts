import path from "path";

function getFullPath(relativePath: string): string {

    return path.join(__dirname, relativePath);
}

export interface IConfig {

    MONGODB_URI: string;
    port: string;
    htmlAssetPath: string;
    staticAssetsPath: string;
}

export const config: IConfig = {

    // MONGODB_URI: (process.env.MONGODB_URI !== undefined) ? process.env.MONGODB_URI : "mongodb://localhost/graviton",
    MONGODB_URI: (process.env.MONGODB_URI !== undefined) ? process.env.MONGODB_URI : "mongodb://hub-graviton:S9GtvpEuCEKsotRiUeQLXkWGaDRq52Y9Hi0bvXIi1iJHB0v8wd4LXhKOquqjJNK7nixp35dEMYSKSw4XqDhFAA%3D%3D@hub-graviton.mongo.cosmos.azure.com:10255/hub-graviton?ssl=true",
    port: (process.env.PORT !== undefined) ? process.env.PORT : "3001",

    htmlAssetPath: getFullPath("../../../client/build/index.html"),
    staticAssetsPath: getFullPath("../../../client/build")
};
