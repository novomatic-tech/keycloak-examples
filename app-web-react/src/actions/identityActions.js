import constants from './constants';
import {createAction} from 'redux-actions';
import {userManager, appConfig} from '../index';

export const signInSilent = createAction(constants.SIGN_IN_SILENT, async () => {
    try {
        await userManager.signinSilent();
    } catch (ex) {
        console.log('Cannot perform silent log in. Reason: ' + ex.message);
    }
});

export const signIn = createAction(constants.SIGN_IN, async () => {
    try {
        await userManager.signinRedirect();
    } catch(e) {
        throw new Error('Unable to redirect to the Authorization Server. ' +
            'Please make sure it is up and running and exposes OpenID Provider\'s configuration endpoint.')
    }
});

export const signOut = createAction(constants.SIGN_OUT, async () => {
    try {
        await userManager.removeUser();
        await userManager.signoutRedirect();
    } catch(e) {
        throw new Error('Unable to finish sign out process. ' +
            'Please make sure the server supports OpenID\'s end session endpoint.')
    }
});

export const changePassword = createAction(constants.CHANGE_PASSWORD, () => {
    const {authority, client_id} = appConfig.oauth2;
    window.location = `${authority}/account/password?referrer=${client_id}`;
});