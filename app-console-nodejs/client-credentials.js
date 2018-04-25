const {config, printAuthResponse, printAuthRequest, printAuthError} = require('./utils');
const KeycloakConfig  = require('keycloak-connect/middleware/auth-utils/config');
const GrantManager  = require('keycloak-connect/middleware/auth-utils/grant-manager');

const main = async () => {
    console.log('Client Credentials Grant');
    console.log('=========================\n');
    console.log(`Welcome to ${config.keycloak.clientId}!\n\nLogging in as a service account...`);

    // These are classes from the keycloak-connect npm module
    const grantManager = new GrantManager(new KeycloakConfig(config.keycloak));
    try {
        printAuthRequest({ grant_type: 'client_credentials' });

        const grant = await grantManager.obtainFromClientCredentials();

        printAuthResponse(grant);
    } catch(e) {
        printAuthError(e);
    }
};

main();