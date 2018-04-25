import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import {Button} from 'material-ui';
import ErrorIcon from 'material-ui-icons/Error';
import PropTypes from 'prop-types';

const AlertType = PropTypes.shape({
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['info','warn','error','fatal']).isRequired,
    onRequestClose: PropTypes.func.isRequired
});

const getAlerts = (alerts, severities, alertClosed) => Object.keys(alerts)
    .map(key => ({
        onRequestClose: () => { alertClosed(key); },
        key,
        ...alerts[key]
    }))
    .filter(a => severities.includes(a.severity))
    .sort((a, b) => (a.timestamp - b.timestamp));

const style = {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0px)',
};

const CloseableDialog = ({alert}) => {
    return (
        <Dialog onRequestClose={alert.onRequestClose} className={'dialog-' + alert.severity} open={true} actions={
            alert.severity === 'error' ? <Button onClick={alert.onRequestClose} label="Close" primary={true} /> : null}>
            <ErrorIcon className={alert.severity + '-icon'} /> <span className={alert.severity + '-message'}>{alert.message}</span>
        </Dialog>
    );
};

CloseableDialog.propTypes = {
    alert: AlertType
};

const CloseableSnackbar = ({alert}) => {
    return (
        <Snackbar open={true} message={alert.message} onRequestClose={alert.onRequestClose} />
    );
};

CloseableSnackbar.propTypes = {
    alert: AlertType
};

const Alerts = ({ alerts, alertClosed }) => (
    <div style={style} >
        {getAlerts(alerts, ['info','warn'], alertClosed).map(a => (<CloseableSnackbar key={a.key} alert={a} />))}
        {getAlerts(alerts, ['error','fatal'], alertClosed).map(a => (<CloseableDialog key={a.key}  alert={a} />))}
    </div>
);

Alerts.propTypes = {
    alertClosed: PropTypes.func.isRequired,
    alerts: PropTypes.object.isRequired
};

export default Alerts;