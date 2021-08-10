# Test automation project for ProShop eCommerce Platform (MERN stack & Redux)

## Env Variables

Create a .env file in then root and add the following

    #base url
    PS_BASE_URL=http://proshopappnina.herokuapp.com

    #admin credentials
    PS_ADMIN_Name=Admin
    PS_ADMIN_EMAIL=admin@example.com
    PS_ADMIN_PASSWORD=123456

    #user credentials
    PS_USER_NAME=User
    PS_USER_EMAIL = user@example.com
    PS_USER_PASSWORD = 123456

## Install Dependencies

`npm install`

## Config file

In config file set browser, suite and spec.

Supported browser chrome and firefox.

If suite and spec are not set, all tests will run.
To run api tests set suite to api.
To run ui tests set suite to ui.
To run single spec set suite and spec name

## Run tests

To run tests
`npm test`
