import {combineReducers} from 'redux';
import {reducer as oidc} from 'redux-oidc';
import alerts from './alertsReducer';
import products from './productsReducer';

const rootReducer = combineReducers({
    appConfig: (state) => state || {},
    alerts,
    oidc,
    products
});

export default rootReducer;