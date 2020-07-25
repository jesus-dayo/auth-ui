## AirAsia Challenge UI

This project is deployed in Heroku and is a simple GUI
to integrate with the AirAsia Auth API

### `Highlevel Architecture`
![architecture](https://github.com/jesus-dayo/airasia-ui/blob/master/authdiagram.png?raw=true)

### `Setup`

- setup .env file 
  - REACT_APP_BASE_URL = [AirAsia Auth API URL]  
- run `npm install`
- run `npm start`


### `Deployment`
- run `npm run build`
- run `node server.js`
- deployed in heroku - https://radiant-woodland-45408.herokuapp.com/
