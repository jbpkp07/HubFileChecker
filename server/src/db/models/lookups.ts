import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaTypeOpts } from "mongoose";


interface ILookupSchema {

    _id?: any;
    label: SchemaTypeOpts<any> | string;
    ordinal: SchemaTypeOpts<any> | number;
    value: SchemaTypeOpts<any> | string;
}

interface ILookupSchemaLanguage extends ILookupSchema {

    iso639: SchemaTypeOpts<any> | string;
    languageName: SchemaTypeOpts<any> | string;
    languageRegional: SchemaTypeOpts<any> | string;
}

const lookupSchema: ILookupSchema = {

    label: {
        minlength: 1,
        required: true,
        type: String
    },
    ordinal: {
        default: 1,
        max: 99,
        min: 1,
        required: true,
        type: Number
    },
    value: {
        minlength: 1,
        required: true,
        type: String,
        unique: true  // value is the unique property
    }
};

const lookupSchemaLanguage: ILookupSchemaLanguage = {

    ...lookupSchema,

    iso639: {
        minlength: 1,
        required: true,
        type: String
    },
    languageName: {
        minlength: 1,
        required: true,
        type: String
    },
    languageRegional: {
        minlength: 1,
        required: true,
        type: String
    }
};

interface ILookupsSchema {

    aspectRatios: ILookupSchema[] | ILookup[];
    languages: ILookupSchemaLanguage[] | ILookupLanguage[];
    versions: ILookupSchema[] | ILookup[];
}

const lookupsSchema: ILookupsSchema & SchemaDefinition = {

    aspectRatios: [lookupSchema],
    languages: [lookupSchemaLanguage],
    versions: [lookupSchema]
};

export const lookupsModel: Model<ILookupsDoc> = mongoose.model("lookups", new Schema(lookupsSchema));

export interface ILookupType {

    ILookup: "ILookup";
    ILookupLanguage: "ILookupLanguage";
}

export interface ILookup extends ILookupSchema {

    _id?: any;
    label: string;
    ordinal: number;
    value: string;
}

export interface ILookupLanguage extends ILookupSchemaLanguage {

    _id?: any;
    iso639: string;
    label: string;
    languageName: string;
    languageRegional: string;
    ordinal: number;
    value: string;
}

export interface ILookupsKind {

    aspectRatios: "aspectRatios";
    languages: "languages";
    versions: "versions";
}

export interface ILookups extends ILookupsSchema {

    aspectRatios: ILookup[];
    languages: ILookupLanguage[];
    versions: ILookup[];
}

export interface ILookupsDoc extends ILookups, Document { }

export function convertToILookups(lookupsDoc: ILookupsDoc): ILookups {

    const lookups: any = lookupsDoc.toObject({ versionKey: false });

    delete lookups._id;

    return (lookups as ILookups);
}
