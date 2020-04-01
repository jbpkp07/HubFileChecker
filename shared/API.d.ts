// tslint:disable: invalid-void
import {
    ILookup as ILookupModel,
    ILookupLanguage as ILookupLanguageModel,
    ILookups as ILookupsModel,
    ILookupsKind as ILookupsKindModel,
    ILookupType as ILookupTypeModel
} from "../server/src/db/models/lookups";
import { IS3Asset as IS3AssetModel } from "../server/src/db/models/s3Assets";


export declare namespace  API {

    interface IApi {

        deleteLookupById(...args: any): void | Promise<ILookups>;
        getLookups(...args: any): void | Promise<ILookups>;
        getS3Assets(...args: any): void | Promise<IS3Asset[]>;
    }

    type ILookupType = ILookupTypeModel;
    type ILookup = ILookupModel;
    type ILookupLanguage = ILookupLanguageModel;
    
    type ILookupsKind = ILookupsKindModel;
    type ILookups = ILookupsModel;

    type IS3Asset = IS3AssetModel;
}
