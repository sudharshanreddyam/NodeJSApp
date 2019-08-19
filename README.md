# NodeJSApp

This is a node js (express) application providing a REST
API to get user and product details.

Follow the below steps to install and query the API.

## Install

    npm install

## Run the app

    npm start

    Application starts on localhost port - 8080 

## REST API

Following are the REST endpoints.
Authentication is done based on the user data available at `\src\data\credentials.json`.

|            URI            | Method |                      Headers                     |                  body(raw)                  |                                        Action                                        |
|:-------------------------:|:------:|:------------------------------------------------:|:-------------------------------------------:|:------------------------------------------------------------------------------------:|
| /auth                     | POST   | Content-Type:application/json                    | {"name": "admin","password": "Welcome!123"} | Returns an access token after verifying the username and password passed in the body |
| /login                    | POST   | Content-Type:application/json                    | {"name": "admin","password": "Welcome!123"} | Same as /api/auth, but uses passport-local strategy for authentication               |
| /api/products             | GET    | token: "XXXX" Add the JWT Token from login route |                      --                     | Return ALL products                                                                  |
| /api/products/:id         | GET    | token: "XXXX" Add the JWT Token from login route | --                                          | Return SINGLE product                                                                |
| /api/products/:id/reviews | GET    | token: "XXXX" Add the JWT Token from login route |                                             | Return ALL reviews for a single product                                              |
| /api/product              | POST   | token: "XXXX" Add the JWT Token from login route |                                             | Add NEW product and return it                                                        |
| /api/users                | GET    | token: "XXXX" Add the JWT Token from login route |                                             | Return ALL users                                                                     |
| /login/facebook           | GET    |                                                  |                                             | Authenticates user with passport-facebook strateg                                    |
| /login/facebook/callback  | GET    |                                                  |                                             |                                                                                      |
| /login/google             | GET    |                                                  |                                             | Authenticates user with passport-google strategy                                     |
| /login/google/callback    | GET    |                                                  |                                             |                                                                                      |
| /login/twitter            | GET    |                                                  |                                             | Authenticates user with passport-twitter strategy                                    |
| /login/twitter/callback   | GET    |                                                  |                                             |                                                                                      |




### NoSQL REST endpoints

METHOD     |  END-POINT                       | ACTION
-----------|----------------------------------|--------
GET        |  /api/nosql/products             |  Return ​ALL​ products
POST       |  /api/nosql/product              |  Add ​NEW​ product and returns it
GET        |  /api/nosql/products/:id         |  Returns the product with given id
GET        |  /api/nosql/products/:id/reviews |  Return ​ALL​ reviews for a single product
GET        |  /api/nosql/users                |  Return ​ALL​ users
POST       |  /api/nosql/user                 |  Saves the user
GET        |  /api/city                       |  Returns a random city
GET        |  /api/cities                     |  Returns ​ALL​ cities
POST       |  /api/cities                     |  Saves the city