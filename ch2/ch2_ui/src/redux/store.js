import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk';

const composeEnhancers =
    typeof
        window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25
        }) : compose;

const middleware = [
    thunk
];

export default createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);
