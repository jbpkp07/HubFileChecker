import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";

import { API } from "../../../../shared/API";


const clientErr: string = "ERROR [api.getS3Assets()]:  \"Server could not retreive s3Assets from graviton database\"";

export async function getS3Assets(cancelToken: CancelTokenSource): Promise<API.IS3Asset[]> {

    const config: AxiosRequestConfig = {

        cancelToken: cancelToken.token
    };

    return new Promise((resolve: Function): void => {

        Axios.get("/api/s3Assets", config)

            .then((response: AxiosResponse<API.IS3Asset[]>) => {

                // console.log(response.data);
                resolve(response.data);
            })
            .catch((thrown: any) => {

                if (Axios.isCancel(thrown)) {

                    console.log(`api.getS3Assets() request cancelled: ${thrown.message}`);
                }
                else {

                    console.log(thrown);

                    alert(clientErr);
                }
            });
    });
}
