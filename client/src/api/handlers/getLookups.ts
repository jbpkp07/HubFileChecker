import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";

import { API } from "../../../../shared/API";


const clientErr: string = "ERROR [api.getLookups()]:  \"Server could not retreive lookups object from graviton database\"";

export async function getLookups(cancelToken: CancelTokenSource): Promise<API.ILookups> {

    const config: AxiosRequestConfig = {

        cancelToken: cancelToken.token
    };

    return new Promise((resolve: Function): void => {

        Axios.get("/api/lookups", config)

            .then((response: AxiosResponse<API.ILookups>) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((thrown: any) => {

                if (Axios.isCancel(thrown)) {

                    console.log(`api.getLookups() request cancelled: ${thrown.message}`);
                }
                else {

                    console.log(thrown);

                    alert(clientErr);
                }
            });
    });
}
