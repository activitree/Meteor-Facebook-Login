/* globals Meteor, facebookConnectPlugin, Accounts, MTR */

import assign from 'lodash/assign'
import pick from 'lodash/pick'

const FB_API_ = (mtr => {
  class FB_API_ {
    static login (options, callback) {
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
        let opts = assign(pick(res.authResponse, ['accessToken', 'expiresIn', 'userID']), {methodName: 'native-facebook'})
        Accounts.callLoginMethod({methodArguments: [opts], userCallback: callback})
        // After I acquire token, do log out so that I can allow multiple users.
        // If I don't log out, Cordova remains logged in with this user and there is no way to
        // log in another user or use FB Graph for other users logged in via email or google.
        // facebookConnectPlugin.logout()
      }, function (err) {
        console.error('err', err)
        callback(err, null)
      })
    }
  }
  return FB_API_
})(Meteor)

MTR.FB_API = FB_API_
export default FB_API_
