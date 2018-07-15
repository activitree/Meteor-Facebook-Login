/* globals Meteor, MTR */

import './init'

if (Meteor.isServer) {
  require('./server')
}

if (Meteor.isClient) {
  require('./client')
  exports.FB_API = MTR.FB_API
}
