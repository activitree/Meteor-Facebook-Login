# Native Facebook SDK login for Meteor (v1.7+) with Graph API V3.0

This package use [cordova-plugin-facebook4](https://www.npmjs.com/package/cordova-plugin-facebook4)

Documentation of the Cordova plugin [here](https://www.npmjs.com/package/cordova-plugin-facebook4)

## Install - n/a via NPM

```
meteor npm install meteor-facebook-login
```

## Setup

- Requirements:

```
meteor add http
meteor add cordova:cordova-plugin-facebook4@3.0.0
```

- Setup cordova plugin (mobile-config.js):

```js
App.configurePlugin('cordova-plugin-facebook4', {
    APP_NAME: 'Name',
    APP_ID: '000000000000'
});
```

## Use

(Server)

```js
import 'meteor-facebook-login';
```

(Client)

```js
import { FB_API } from 'meteor-facebook-login';

// Login with Facebook
FB_API.login(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('login...');
    }
});
```

## License
MIT
- 
