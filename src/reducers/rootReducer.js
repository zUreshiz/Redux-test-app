import { combineReducers } from "redux";
import counterReducer from "./counter.reducer";
import productReducer from "./product.reducer";

const rootReducer = combineReducers({ counterReducer, productReducer });

export default rootReducer;
