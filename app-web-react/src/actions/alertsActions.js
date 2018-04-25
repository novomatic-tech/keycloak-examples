import {createAction} from 'redux-actions';
import constants from './constants';

export const alertClosed = createAction(constants.DISMISS_MESSAGE, (alertKey) => {
    return alertKey;
});
