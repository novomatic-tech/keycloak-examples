# NodeJS Web Client Example

This directory consists of a sample server-side web application ([Hapijs-based](https://hapijs.com/))
which can authorize with [Keycloak](http://www.keycloak.org/) using OAuth2.0's Authorization Code Grant.

It uses both [keycloak-connect](https://github.com/keycloak/keycloak-nodejs-connect/) 
and [keycloak-hapi](https://github.com/novomatic-tech/keycloak-hapi) libraries to minimize the code that needs to be written.

## Prerequisites

- A running instance of [Keycloak](http://www.keycloak.org/) with a realm and a `confidential` client configured
  according to the `config.yaml` and `Standard Grant` enabled.
- Installed [NodeJS](https://nodejs.org/en/)
- Installed all dependencies

```bash
npm install
```

## Authorization code grant

The [authorization code grant](https://tools.ietf.org/html/rfc6749#section-1.3.1) 
is the most commonly used because it is optimized for server-side applications, 
where source code is not publicly exposed, and Client Secret confidentiality can be maintained. 
This is a redirection-based flow, which means that the application must be capable of interacting 
with the user-agent (i.e. the user's web browser) and receiving API authorization codes that 
are routed through the user-agent.

To run this flow type the following command:

```
npm start
```

Visit the `localhost:8888` and try to sign in as `jsnow:jsnow`.
Once signed in, navigate to the restricted part of the app.
In a meantime observe server logs for access token traces.
