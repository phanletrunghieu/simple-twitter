import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from 'redux-saga'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import rootReducer from "./rootReducer";
import rootSaga from "../saga";

// logger middleware
let logger = createLogger({
    timestamps: true,
    duration: true
});


// saga middleware
const sagaMiddleware = createSagaMiddleware()

// persist middleware
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export function initializeStore(){
    let store = createStore(
        persistedReducer,
        applyMiddleware(logger, sagaMiddleware)
    )

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}