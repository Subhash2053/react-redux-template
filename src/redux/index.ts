
import { createStore, applyMiddleware, compose } from "redux";

import thunk from 'redux-thunk';
import rootReducer from "./reducer";


const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      thunk,
     
      )
    ;
  } else {
    // Enable additional logging in non-production environments.
    return compose( applyMiddleware(
      thunk,
   
      )
      ,(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
   )
    
  }
};

const store = createStore(
    rootReducer,getMiddleware()
  
    );


export default store;
