import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaTypeOpts } from "mongoose";


interface IS3AssetSchema {

    client: SchemaTypeOpts<any> | string;
    cycle: SchemaTypeOpts<any> | string;
    facilisPath: SchemaTypeOpts<any> | string;
    facilisSize: SchemaTypeOpts<any> | number;
    fileName: SchemaTypeOpts<any> | string;
    notes: SchemaTypeOpts<any> | string;
    preSignedProxyUrl: SchemaTypeOpts<any> | string;
    preSignedUrl: SchemaTypeOpts<any> | string;
    qcChecked: SchemaTypeOpts<any> | boolean;
}

const s3AssetSchema: IS3AssetSchema & SchemaDefinition = {

    client: {
        minlength: 1,
        required: true,
        type: String
    },
    cycle: {
        minlength: 1,
        required: true,
        type: String
    },
    facilisPath: {
        minlength: 1,
        required: true,
        type: String
    },
    facilisSize: {
        default: 1,
        min: 1,
        required: true,
        type: Number
    },
    fileName: {
        minlength: 1,
        required: true,
        type: String
    },
    notes: {
        minlength: 1,
        required: true,
        type: String
    },
    preSignedProxyUrl: {
        minlength: 1,
        required: true,
        type: String
    },
    preSignedUrl: {
        minlength: 1,
        required: true,
        type: String
    },
    qcChecked: {
        default: false,
        minlength: 1,
        required: true,
        type: Boolean
    }
};

export interface IS3Asset extends IS3AssetSchema {

    _id?: any;
    client: string;
    cycle: string;
    facilisPath: string;
    facilisSize: number;
    fileName: string;
    notes: string;
    preSignedProxyUrl: string;
    preSignedUrl: string;
    qcChecked: boolean;
}

export interface IS3AssetDoc extends IS3Asset, Document { 

    _id: any;
}

export const s3AssetsModel: Model<IS3AssetDoc> = mongoose.model("s3assets", new Schema(s3AssetSchema));

export function convertToS3Asset(s3AssetDoc: IS3AssetDoc): IS3Asset {

    const s3Asset: IS3Asset = s3AssetDoc.toObject({ versionKey: false });

    // delete s3Asset._id;

    return s3Asset;
}
