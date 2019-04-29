# stit-backend-challenge
Repository holding the code for STIT backend challenge

# Installation
Run `npm install`

# Running
Run `node app.js`. The default port used is `8000` which can be customized in `app.js`

# Endpoints
All routes are mentioned in `routes/user.route.js`. Please append `/secure` to the url for all secure routes


## Create user with the following POST request:
Endpoint: `localhost:8000/signup`
Body: 
```json
{
	"username": "test",
	"password": "1234",
	"classificationName": "Music",
	"genreId": "KnvZfZ7vAee"
}
```


## Login user with the following POST request:
Endpoint: `localhost:8000/login`
Body: 
```json
{
	"username": "hp",
	"password": "1234"
}
```

If credentials are corrent, you should get a JSON response something similar to this: 
```json
{
    "msg": "succesfully logged in!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJyT0ZEX3RIVUoiLCJ1c2VybmFtZSI6ImhwIiwiY2xhc3NpZmljYXRpb25OYW1lIjoiTXVzaWMiLCJnZW5yZUlkIjoiS252WmZaN3ZBZWUiLCJjcmVhdGVkIjoxNTU2NTY3NzYyLCJleHBpcnkiOjE1NTY1NzEzNjIsImlhdCI6MTU1NjU2Nzc2Mn0.cU0sA6oYppkLFPa6Y9k0Gn2IbQNlsIn4I2HGyiBGt0I"
}
```
This contains token, which will be used in the subsequent secure endpoints with the header `Authorization`. The default expiry for the token is 60 minutes, which can be customized in `user.controller.js`


## Update user preferences with the following POST request:
Endpoint: `localhost:8000/secure/setPreferences`
Body: 
```json
{
	"classificationName": "Music",
	"genreId": "KnvZfZ7vAv1"
}
```

## Get events based on user preferences using the following GET request:
Endpoint: `localhost:8000/secure/getEvents`

The data is returned in the `data` field of the response object if succesful.

# Notes
`JWT` is used for token management. MVC pattern is followed, although since the number of endpoints are few, all controllers reside in a single file. Password is hashed and then stored.
