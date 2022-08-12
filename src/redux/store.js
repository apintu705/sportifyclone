import {createStore,combineReducers,applyMiddleware} from"redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { reducerss } from "./reducer/reducer";

const reducer=combineReducers({
    red:reducerss
});

let initialstate={
    
};

const middleware = [thunk];

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)));

export default store;