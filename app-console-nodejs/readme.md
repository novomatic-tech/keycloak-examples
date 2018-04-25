# NodeJS Console Client Example

This directory consists of a sample NodeJS console client (native client)
which can authorize with [Keycloak](http://www.keycloak.org/) using OAuth2.0 protocol. 

The console application implements two authorization scenarios ([OAuth2.0 flows](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)):
- Resource Owner Password Credentials
- Client Credentials

## Prerequisites

- A running instance of [Keycloak](http://www.keycloak.org/) with a realm and a `confidential` client configured
  according to the `keycloak.yaml` and both `Direct Access Grants` and `Service Accounts` enabled.
- Installed [NodeJS](https://nodejs.org/en/)
- Installed all dependencies

```bash
npm install
```

## Resource Owner Password Credentials

In the [Resource Owner Password Credentials Grant](https://tools.ietf.org/html/rfc6749#section-1.3.3) the user provides their 
service credentials (username and password) directly to the console application, which uses the credentials 
to obtain an access token from the service. Examples of when this might be useful include if an application
cannot use redirection flows ([authorization code or implicit](https://tools.ietf.org/html/rfc6749#section-1.3.1)), 
or an application is trusted by the user (e.g. it is owned by the service, 
or the user's desktop OS) so it is safe to pass credentials.

To run this flow type the following command and enter `jsnow:jsnow` credentials when prompted 

```bash
$ npm run grant:resource-owner

Resource Owner Password Credentials Grant
=========================================

Welcome to app-console-nodejs!
Please enter your credentials.
Username: jsnow
Password:

```

## Client Credentials

[Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-1.3.4) provides the console application 
a way to access its own service account (the console application becomes a user itself). 
Examples of when this might be useful include if an application wants to update its registered 
description or redirect URI, or access other data stored in its service account via the API. 

To run this flow type the following command

```
npm run grant:client
```

## What happens behind curtains

You can find out how authorization server's HTTP requests actually looked like using the `showHttp` flag

```bash
npm run grant:resource-owner -- --showHttp
```

Please bear in mind that this will print sensitive data right 
on to console (like a client secret or the user password)
