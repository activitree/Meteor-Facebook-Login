/* globals MTR, Meteor, Accounts, facebookConnectPlugin */

'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _createClass = (function () {
  function defineProperties (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _lodash = require('lodash')
var _lodash2 = _interopRequireDefault(_lodash)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : {default: obj} }

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var FB_API_ = (function (mtr) {

  var FB_API_ = (function () {
    function FB_API_ () {
      _classCallCheck(this, FB_API_)
    }

    _createClass(FB_API_, null, [{
      key: 'login',

      // Static
      // ------------------------------------------------------------------------
      value: function login (options, callback) {
        // Default login
        if (!mtr.isCordova || typeof facebookConnectPlugin === 'undefined') {
          return mtr.loginWithFacebook(options, callback)
        }

        // support a callback without options
        if (!callback && typeof options === 'function') {
          callback = options
          options = {
            'requestPermissions': ['public_profile', 'email', 'user_friends']
          }
        }

        facebookConnectPlugin.login(options.requestPermissions, function (res) {
          var opts = _lodash2.default.assign(_lodash2.default.pick(res.authResponse,
            ['accessToken', 'expiresIn', 'userID']), {methodName: 'native-facebook'})

          Accounts.callLoginMethod({methodArguments: [opts], userCallback: callback})
          // After I acquire token, do log out so that I can allow multiple users.
          // If I don't log out, Cordova remains logged in with this user and there is no way to
          // log in another user or use FB Graph for other users logged in via email or google.
          facebookConnectPlugin.logout()
        }, function (err) {
          console.error('err', err)
          callback(err, null)
        })
      }
    }])

    return FB_API_
  })()

  return FB_API_
})(Meteor)

MTR.FB_API = FB_API_
exports.default = FB_API_
