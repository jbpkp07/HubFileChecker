import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";

import { API } from "../../../../shared/API";


const clientErr: string = "ERROR [api.deleteLookupById()]:  \"Server could not delete lookup entry from graviton database\"";

export async function deleteLookupById(kind: keyof API.ILookupsKind, _id: string, cancelToken: CancelTokenSource): Promise<API.ILookups> {

    const config: AxiosRequestConfig = {

        cancelToken: cancelToken.token
    };

    return new Promise((resolve: Function): void => {

        Axios.delete(`/api/lookups/${kind}/${_id}`, config)

            .then((response: AxiosResponse<API.ILookups>) => {
                
                // console.log(response.data);
                resolve(response.data);
            })
            .catch((thrown: any) => {

                if (Axios.isCancel(thrown)) {

                    console.log(`api.deleteLookupById() request cancelled: ${thrown.message}`);
                }
                else {

                    console.log(thrown);

                    alert(clientErr);
                }
            });
    });
}
