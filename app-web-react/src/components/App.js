import React from 'react';
import './App.css';
import {AppBar, Grid, Toolbar, Typography} from 'material-ui';
import {signIn, signInSilent, signOut, changePassword} from '../actions/identityActions';
import {alertClosed} from '../actions/alertsActions';
import {Switch, Route, Link} from 'react-router-dom';
import {connected} from '../store/connected';
import IdentityMenu from './IdentityMenu';
import Alerts from './Alerts';
import HomePage from './HomePage';
import AccountPage from './AccountPage';
import AppIcon from 'material-ui-icons/Apps';
import PropTypes from 'prop-types';

const isAuthenticated = (user) => {
    return !!(user && user.profile);
};

const getUserName = (user) => {
    return (user && user.profile && user.profile.name)
        ? user.profile.name
        : '';
};

class App extends React.Component {

    componentDidMount() {
        const { actions, user } = this.props;
        if (!user){
            actions.signInSilent().catch(e => console.error(e));
        }
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Grid container justify="center" spacing={0}>
                        <Grid item xs={9}>
                            <Toolbar style={{padding: 0}}>
                                <AppIcon className="appIcon"/>
                                <Typography type="title" color="inherit" className="flex">
                                    <Link className="applicationName" to="/">{this.props.clientId}</Link>
                                </Typography>
                                <IdentityMenu userName={getUserName(this.props.user)}
                                    isAuthenticated={isAuthenticated(this.props.user)}
                                    signIn={this.props.actions.signIn}
                                    signOut={this.props.actions.signOut}
                                    changePassword={this.props.actions.changePassword}
                                />
                            </Toolbar>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container justify="center" spacing={0} style={ {marginTop: '1em'}}>
                    <main>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/account" component={AccountPage} />
                        </Switch>
                    </main>
                </Grid>
                <Grid container justify="center" spacing={0} style={ {marginTop: '1em'}}>
                    <div className="bottomBar">
                        &copy; 2018 NOVOMATIC Technologies Poland S.A.
                    </div>
                </Grid>
                <Alerts alerts={this.props.alerts} alertClosed={this.props.actions.alertClosed} />
            </div>
        );
    }
}

App.propTypes = {
    clientId: PropTypes.string,
    user: PropTypes.object,
    alerts: PropTypes.object.isRequired,
    actions: PropTypes.shape({
        signIn: PropTypes.func.isRequired,
        signInSilent: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
        changePassword: PropTypes.func.isRequired,
        alertClosed: PropTypes.func.isRequired
    })
};

export default connected(App)
    .mappingStateToProps((state) => {
        return {
            clientId: state.appConfig.oauth2.client_id,
            user: state.oidc.user,
            alerts: state.alerts
        };
    })
    .mappingActionsToProps({ signIn, signInSilent, signOut, changePassword , alertClosed })
    .build();
