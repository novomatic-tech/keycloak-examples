import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import {MuiThemeProvider} from 'material-ui/styles';
import configureStore from './store/configureStore';
import { CallbackComponent } from 'redux-oidc';
import {OidcProvider, loadUser } from 'redux-oidc';
import App from './components/App';
import {Route, Switch} from 'react-router-dom';
import theme from './theme';
import {UserManager, WebStorageStateStore} from 'oidc-client';
import axios from 'axios';

const createUserManager = (config) => {
    const userStore = new WebStorageStateStore({store: window.localStorage});
    const userManagerSettings = Object.assign({userStore: userStore}, config);
    const userManager =  new UserManager(userManagerSettings);
    userManager.events.addUserSignedOut(() => {
        userManager.removeUser();
    });
    return userManager;
};

const renderApp = (store) => {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <OidcProvider store={store} userManager={userManager}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/auth-callback" render={(props) => (
                                <CallbackComponent
                                    userManager={userManager}
                                    successCallback={() => props.history.replace('/')}
                                    errorCallback={() => props.history.replace('/')}>
                                    <div>Redirecting...</div>
                                </CallbackComponent>
                            )}/>
                            <Route path="*" component={App}/>
                        </Switch>
                    </BrowserRouter>
                </OidcProvider>
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('root'))
};

export let appConfig;
export let userManager;

const run = async () => {
    appConfig = (await axios.get('/config.json')).data;
    userManager = createUserManager(appConfig.oauth2);
    const store = configureStore({ userManager, initialState: { appConfig } });
    await loadUser(store, userManager);
    renderApp(store);
};

run().catch(e => console.error(e));
