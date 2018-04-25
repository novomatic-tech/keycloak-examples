
export default function alertsReducer(state = {}, action) {
    if (action.rejected || action.error) {
        const alerts = Object.assign({}, state);
        alerts[action.type] = {
            message: action.payload.message,
            timestamp: Date.now(),
            severity: 'error',
        };
        return alerts;
    }
    if (action.type === 'ALERT_CLOSED') {
        const alertKey = action.payload;
        const alerts = Object.assign({}, state);
        delete alerts[alertKey];
        return alerts;
    }

    return state;
}
