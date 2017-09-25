# Node AuthService Mock

This a simple AuthService mock that can be used for experiments.

## User Store

This app does not have any store. It abuses environment variables to store users, for example the user 'bensl' with password 'secret' would be set like this:

`USER_BENSL=secret`

To set multiple users, just set multiple variables. Usernames are case-insensitive. 

This avoids hard-coding credentials into the code. But it's just a mock. **DO NOT USE FOR REAL**.

## API

The app has the following routes:

### `GET /`

Status: 403

By default there is no root path.

### `GET /api/status`

A simple endpoint to check if the service is working, which returns:

```
{
  status: 200,
  message: 'healthy'
}
```

### `POST /api/login`

Accepts JSON in the following structure:

```
login: {
  "user": "username",
  "password": "secret" 
}
```
