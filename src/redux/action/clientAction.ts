
import { apiService } from '../../services';

export const clientTypes = {

    FETCH_CLIENT_DATA: "FETCH_CLIENT_DATA",
    CLIENT_DATA_UNLOADED: "CLIENT_DATA_UNLOADED",
    POST_CLIENT_DATA: "POST_CLIENT_DATA"



}


export const fetchClientData = (url: string,onFinally?: Function) => {

    return async (dispatch: any) => {

        apiService.getAll(url)
            .then(
                data => {

                    dispatch({
                        type: clientTypes.FETCH_CLIENT_DATA,
                        payload: data
                    })
                    if(onFinally){
                    onFinally();
                    }
                },
                error => {
                    console.log(error.toString())
                    if(onFinally){
                        onFinally();
                        }
                }
            );


    };


}


export const addClientData = (payload: object, onSuccess: Function, onError: Function) => {
    return async (dispatch: any) => {
        apiService.save('/client/store', payload)
        .then(
            data => {

                dispatch({
                    type: clientTypes.POST_CLIENT_DATA,
                    payload: data
                })
                onSuccess();
                

            },
            error => {
                onError();
                console.log(error.toString())
            }
        );
    };
};
export const unloadClientData = () => {
    return {
        type: clientTypes.CLIENT_DATA_UNLOADED,
        payload: {}

    };
}



