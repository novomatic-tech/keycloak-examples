import { isFSA } from 'flux-standard-action';

function isPromise(val) {
    return val && typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
    return next => action => {
        if (isFSA(action) && isPromise(action.payload)) {
            dispatch({ ...action, pending: true, payload: null });
            return action.payload.then(
                result => {
                    try {
                        dispatch({ ...action, fulfilled: true, payload: result });
                    } catch (ex) {
                        console.error(ex);
                    }
                    return Promise.resolve(result);
                },
                error => {
                    console.error(error);
                    try {
                        dispatch({ ...action, rejected: true, payload: error });
                    } catch (ex) {
                        console.error(ex);
                    }
                    return Promise.reject(error);
                }
            );
        } else if (isPromise(action)) {
            return action.then(dispatch);
        }
        return next(action);
    };
}