# UnwiseConnect

A web app to help do things with ConnectWise.

## Development setup

1. Clone the repo
2. Duplicate .env.example to .env and populate the following values: `REACT_APP_FIREBASE_API, REACT_APP_FIREBASE_DOMAIN, REACT_APP_FIREBASE_DATABASE, REACT_APP_FIREBASE_BUCKET, REACT_APP_FIREBASE_SENDER, REACT_APP_API_KEY, REACT_APP_API_URL, REACT_APP_CONNECTWISE_SERVER_URL`.
3. `yarn start`

#### Docker development setup

Assumes repo is cloned and docker daemon is running.

0. Create your .env file as described above.
1. `docker-compose up`
