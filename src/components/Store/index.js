import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
// import {createLogger} from "redux-logger"

import rootReducer from "./reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const logger = createLogger()
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk,))
);

export default store;
// NB: redux-thunk is a middleware.
// Middleware affects what happen in between an action and a reducer.
// Actions are the only thing that can be dispatched by default.
// With redux-thunk, you can dispatch a function which in turn can make
// an async request and dispatch the relevant actions which then gets to the reducer.
