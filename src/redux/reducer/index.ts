import { combineReducers } from "redux";

import clientReducer from "./clientReducer";

export type RootState = ReturnType<typeof allReducer>;

const allReducer = combineReducers({
 client:clientReducer,

});

const rootReducer = (state: any, action: { type: string }) => {

  return allReducer(state, action);
};

export default rootReducer;
