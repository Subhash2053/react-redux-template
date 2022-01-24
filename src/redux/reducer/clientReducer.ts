import { clientTypes } from "../action/clientAction";


const initialState:Array<any> = [];
export default (state = initialState, action:any) => {
    switch (action.type) {
        case clientTypes.FETCH_CLIENT_DATA:

            return action.payload;

        case clientTypes.CLIENT_DATA_UNLOADED:
            return initialState;
        case clientTypes.POST_CLIENT_DATA:
           
             return { ...state};
      

        default:
            return state;
    }
};
