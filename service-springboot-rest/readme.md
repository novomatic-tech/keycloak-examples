# Spring Boot Resource Server Example

This directory consists of a sample resource server ([Spring Boot based](https://projects.spring.io/spring-boot/))
which can validate OAuth2.0 access tokens issued by [Keycloak](http://www.keycloak.org/).

It uses [keycloak-spring-boot-starter](https://www.keycloak.org/docs/latest/securing_apps/index.html#_spring_security_adapter) 
to minimize the code that needs to be written.

## Prerequisites

- A running instance of [Keycloak](http://www.keycloak.org/) with a realm and a `bearer-only` client configured
  according to the `src/main/resources/application.properties`.
- [Java JDK 8+](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven](https://maven.apache.org/)

## Resource server

A resource server hosts the protected resources and is capable of accepting
and responding to protected resource requests using access tokens.
Access tokens are passed using the [Authorization HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
as an additional information to a typical server request, i.e.:

```
GET http://localhost:9999/api/products
Authorization: Bearer [access_token]
```

Access tokens, sent this way, give us an abstraction layer 
which removes the resource server's need
to understand a wide range of authentication methods (incl. Basic auth)
even though different type of clients (OAuth2.0 grants) are used.

This example implements a resource server
which exposes a protected `/api/products` resource.
However, in order to access it, a valid access token needs to be issued by the authorization server.
The quickest way to go through this example is to:

1. Run the resource server.

  ```
  mvn spring-boot:run
  ```

2. Visit the `localhost:9999` to verify that the server is up and running (it should return a whitelabel page).
3. Switch to the [app-web-react](../app-web-react), run it and log in as `astark:astark`.
4. Once logged in, request for a list of products hosted by the resource server using the `List Products` button.
5. Notice how a user is validated by watching resource server's logs.
6. Now, try to do the same using the `jsnow:jsnow` credentials.
   Since `jsnow` has no `view-products` role assigned - a role
   which is required when accessing the `/api/products` route,
   this call won't be possible.



