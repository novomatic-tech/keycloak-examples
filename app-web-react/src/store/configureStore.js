import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import promiseMiddleware from './promiseMiddleware';
import createOidcMiddleware from 'redux-oidc';

export default function configureStore({initialState, userManager}) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        initialState || {},
        composeEnhancers(applyMiddleware(
            immutableStateInvariant(),
            promiseMiddleware,
            createOidcMiddleware(userManager)
        )));
}