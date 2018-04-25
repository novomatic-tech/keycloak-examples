const {config, readInput, printAuthRequest, printAuthResponse, printAuthError} = require('./utils');
const KeycloakConfig  = require('keycloak-connect/middleware/auth-utils/config');
const GrantManager  = require('keycloak-connect/middleware/auth-utils/grant-manager');

const main = async () => {
    console.log('Resource Owner Password Credentials Grant');
    console.log('=========================================\n');
    console.log(`Welcome to ${config.keycloak.clientId}!\nPlease enter your credentials.`);

    // These are classes from the keycloak-connect npm module
    const grantManager = new GrantManager(new KeycloakConfig(config.keycloak));
    let {username, password} = config;
    try {
        if (!username) username = await readInput({prompt: 'Username: '});
        if (!password) password = await readInput({prompt: 'Password: ', silent: true });
        console.log('\n');

        printAuthRequest({ grant_type: 'password', username, password });

        const grant = await grantManager.obtainDirectly(username, password);

        printAuthResponse(grant);
    } catch(e) {
        console.error(e);
        printAuthError(e);
    }
};

main();
