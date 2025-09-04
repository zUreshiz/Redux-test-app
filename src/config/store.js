import myLogger from "../middlewares/logger";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(myLogger, thunk))
);

export default store;
