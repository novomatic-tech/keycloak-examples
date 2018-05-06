const nconf = require('nconf');
const yaml = require('nconf-yaml');
const read = require('read');

const config = nconf
  .argv({ parseValues: true })
  .file({ file: 'keycloak.yaml', format: yaml })
  .defaults({ showHttp: false, decodeJwt: false })
  .get();

const printJson = (obj) => {
    console.log(JSON.stringify(obj, null, 2));
    console.log('\n');
};

const readInput = (opt) => {
    return new Promise((resolve, reject) => {
        read(opt, function(er, secret) {
           if (er) {
              reject(new Error(`Interrupted read!`));
           } else {
               resolve(secret);
           }
        })
    });
};

const printJwt = (tokenType, jwt) => {
    console.log(`============ ${tokenType} =============\n`);
    printJson(jwt);
};

const printAuthRequest = (options) => {
    if (!config.showHttp) {
        return;
    }
    const {serverUrl, realm, clientId, secret} = config.keycloak;
    let request = `POST ${serverUrl}/realms/${realm}/protocol/openid-connect/token\n` +
        'Content-Type: application/x-www-form-urlencoded\n\n' +
        `grant_type=${options.grant_type}&client_id=${clientId}&client_secret=${secret}`;
    if (options.grant_type === 'password') {
        request += `&username=${options.username}&password=${options.password}`;
    }
    console.log(`============ Raw HTTP Request =============\n`);
    console.log(request + '\n');
};

const printAuthResponse = (grant) => {
    if (config.showHttp) {
        const {expires_in, token_type} = grant;
        const access_token = grant.access_token.token;
        const id_token = grant.id_token.token;
        const refresh_token = grant.refresh_token.token;

        console.log(`============ Raw HTTP Response =============\n`);
        console.log('200 OK\n');
        printJson({
            expires_in, token_type, access_token, id_token, refresh_token
        });
    }

    console.log(`\nYou have been successfully authorized!\n\nHere is your access token:\n${grant.access_token.token}`);

    if (config.decodeJwt) {
        printJwt('Access Token', grant.access_token.content);
        printJwt('Refresh Token', grant.refresh_token.content);
        printJwt('ID Token', grant.id_token.content);
    }
};

const printAuthError = (e) => {
    console.log('Something went wrong during your authorization!');
    printJson(e);
};

module.exports = {config, printAuthRequest, printAuthResponse, printAuthError, readInput};