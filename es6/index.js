/* globals Meteor, BasMTR */

import './init'

if (Meteor.isServer) {
  require('./server')
}

if (Meteor.isClient) {
  require('./client')
  exports.FB_API = BasMTR.FB_API
}
