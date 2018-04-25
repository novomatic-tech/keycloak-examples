# React Web Client Example

This directory consists of a sample single page application (React-based)
which can authorize with [Keycloak](http://www.keycloak.org/) using OAuth2.0's Implicit Grant.

It uses both [oidc-client-js](https://github.com/IdentityModel/oidc-client-js) 
and [redux-oidc](https://github.com/maxmantz/redux-oidc) libraries to minimize the code that needs to be written.

## Prerequisites

- A running instance of [Keycloak](http://www.keycloak.org/) with a realm and a `public` client configured
  according to the `oauth` section of the `public/config.json` and `Implicit Grant` enabled.
- Installed [NodeJS](https://nodejs.org/en/)
- Installed all dependencies

```bash
npm install
```

## Implicit grant

The [Implicit Grant](https://tools.ietf.org/html/rfc6749#section-1.3.2) is used for mobile apps 
and web applications (i.e. applications that run in a web browser), where the client secret confidentiality 
is not guaranteed. The implicit grant type is also a redirection-based flow but the access token 
is given to the user-agent to forward to the application, so it may be exposed to the user 
and other applications on the user's device. Also, this flow does not authenticate the identity of the application, 
and relies on the redirect URI (that was registered with the service) to serve this purpose.

To run this flow type the following command:

```
npm start
```

Visit the `localhost:3000` and try to sign in as `jsnow:jsnow`.
Once signed in, click the user name and navigate to the Account to see both access and ID tokens.
