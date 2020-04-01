// tslint:disable: invalid-void
import {
    ILookup as ILookupModel,
    ILookupLanguage as ILookupLanguageModel,
    ILookups as ILookupsModel,
    ILookupsKind as ILookupsKindModel,
    ILookupType as ILookupTypeModel
} from "../server/src/db/models/lookups";


export declare namespace API {

    interface IApi {

        deleteLookupById(...args: any): void | Promise<ILookups>;
        getLookups(...args: any): void | Promise<ILookups>;
    }

    type ILookupType = ILookupTypeModel;
    type ILookup = ILookupModel;
    type ILookupLanguage = ILookupLanguageModel;
    
    type ILookupsKind = ILookupsKindModel;
    type ILookups = ILookupsModel;
}
