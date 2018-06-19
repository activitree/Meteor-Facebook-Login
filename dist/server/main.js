/* globals BasMTR, Accounts, Meteor, HTTP */
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

const _assign = require('lodash.assign')
const _assign2 = _interopRequireDefault(_assign)

const _chai = require('chai')

const _chai2 = _interopRequireDefault(_chai)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : {default: obj} }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

var expect = _chai2.default.expect

var FB_API_Login_Handler_ = (function (mtr) {
  // ------------------------------------------------------------------------
  // Constants
  // ------------------------------------------------------------------------

  // var VERSION = BasMTR.Utils.VERSION

  // ------------------------------------------------------------------------
  // Vars
  // ------------------------------------------------------------------------

  // Include all fields from facebook
  // http://developers.facebook.com/docs/reference/login/public-profile-and-friend-list/
  var _fields = ['id', 'email', 'name', 'first_name', 'last_name', 'link', 'gender', 'locale', 'age_range'];
  var _apiUri = 'https://graph.facebook.com/v3.0/me'

  // ------------------------------------------------------------------------
  // Class Definition
  // ------------------------------------------------------------------------

  var FB_API_Login_Handler_ = (function () {
    function FB_API_Login_Handler_ () {
      _classCallCheck(this, FB_API_Login_Handler_)
    }

    // Getters
    // ------------------------------------------------------------------------

    _createClass(FB_API_Login_Handler_, null, [{
      key: 'login',

      // Static
      // ------------------------------------------------------------------------

      value: function login (options) {
        console.log('native-facebook')
        if (options.methodName !== 'native-facebook') {
          return
        }

        // authResponse accessToken, expiresIn, userID
        expect(options).to.have.property('accessToken').that.is.a('string')
        expect(options).to.have.property('expiresIn').that.is.a('string')
        expect(options).to.have.property('userID').that.is.a('string')

        var user = mtr.users.findOne({
          'services.facebook.id': options.userID
        })

        if (!user) {
          var identity = FB_API_Login_Handler_.getIdentity(options.accessToken)
          _assign2(identity, {
            accessToken: options.accessToken,
            expiresAt: +new Date() + 1000 * options.expiresIn
          })
          var _options = {
            profile: {
              name: identity.first_name + ' ' + identity.last_name
            }
          }
          user = {
            services: {
              facebook: identity
            }
          }
          user._id = Accounts.insertUserDoc(_options, user)
        }

        return {
          userId: user._id
        }
      }

      // Get Identity

    }, {
      key: 'getIdentity',
      value: function getIdentity (accessToken) {
        expect(accessToken).to.be.a('string')
        try {
          return HTTP.get(_apiUri, {
            params: {
              access_token: accessToken,
              fields: _fields.join(',')
            }
          }).data
        } catch (ex) {
          var err = new Error('Failed to fetch identity from Facebook. ' + ex.message)
          err.response = ex.response
          throw err
        }
      }

      // Static Private
      // ------------------------------------------------------------------------

    }])

    return FB_API_Login_Handler_
  })()

  // Set login handler

  Accounts.registerLoginHandler(function (options) {
    return FB_API_Login_Handler_.login(options)
  })
  return FB_API_Login_Handler_
})(Meteor)

BasMTR.FB_API_Login_Handler = FB_API_Login_Handler_
exports.default = FB_API_Login_Handler_
