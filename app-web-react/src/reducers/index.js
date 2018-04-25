import {combineReducers} from 'redux';
import {reducer as oidc} from 'redux-oidc';
import alerts from './alertsReducer';

const rootReducer = combineReducers({
    appConfig: (state) => state || {},
    alerts,
    oidc
});

export default rootReducer;