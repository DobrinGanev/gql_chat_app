# gql_chat_app
Chat App using Apollo Server and Client with React

### Install on the client and the server

1. cd to the client and ```npm i```
2. cd to the server and ```npm i```

### Run in in dev

1. cd to the server and ```npm run dev``` this will also start the client app

### Tests

1. there is one test on the client
``` npm test ```

To test the chat,  open two different browsers because the user token is saved in the localStorage. 

For example, test it with Chrome and Chromium, or Chrome and Firefox.

On refresh, the token is removed and the data on the server is in memory only, so restart the server will wipe out the data
