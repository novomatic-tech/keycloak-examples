const Hapi = require('hapi');
const yar = require('yar');
const laabr = require('laabr');
const keycloakAdapter = require('keycloak-hapi');
const yamlFormat = require('nconf-yaml');
const nconf = require('nconf');
const path = require('path');

const loadConfig = () => {
    const config = nconf
            .argv({ parseValues: true })
            .file({ file: path.join(process.cwd(), 'application.yaml'), format: yamlFormat });
    return config.get();            
};


const configureLogging = async (server, options) => {
  await server.register({ plugin: laabr, options });
};

const configureSessionStore = async (server, options) => {
  await server.register({ plugin: yar, options });
};

const configureAuth = async (server, options) => {
  await server.register({ plugin: keycloakAdapter, options });
  server.auth.strategy('keycloak', 'keycloak');
  server.auth.default('keycloak');
};

const createServer = async () => {
    const config = loadConfig();
    const server = new Hapi.Server(config.server);
    await configureLogging(server, config.logging);
    await configureSessionStore(server, config.sessionStore);
    await configureAuth(server, config.auth);
    return server;
};

const run = async () => {
    const server = await createServer();

    server.route({
        method: ['GET'],
        path: '/',
        handler(request, reply) {
            server.log(['info'], `Requesting ${request.raw.req.url} as ${request.auth.isAuthenticated ? request.auth.credentials.name : '[anonymous]'}`);
            if (request.auth.isAuthenticated) {
                return `<h1 style="font-family: Trebuchet MS">Welcome, <strong>${request.auth.credentials.name}</strong>!</h1>You can now navigate to the <a href="/restricted">restricted part of the app</a> or <a href="/sso/logout">Logout</a>`;
            } else {
                return `<h1 style="font-family: Trebuchet MS">Welcome! Please <a href="/sso/login">sign in</a> to visit the restricted part of the app.</h1>`
            }
        },
        options: {
            auth: {
                mode: 'try'
            }
        }
    });

    server.route({
        method: ['GET'],
        path: '/restricted',
        handler(request, reply) {
            server.log(['debug'], `Obtaining access token for request: ${request.raw.req.url}\n${JSON.stringify(request.auth.credentials.accessToken.content)}`);
            return `<h1 style="font-family: Trebuchet MS">You're now in the restricted part of the app, <strong>${request.auth.credentials.name}</strong>!</h1> <br/><a href="/sso/logout">Logout</a>`;
        }
    });

  await server.start();
}
  
run().catch(e => {
    console.error(e);
    process.exit(1);
});