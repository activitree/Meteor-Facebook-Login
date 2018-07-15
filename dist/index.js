/* globals Meteor, MTR */
'use strict'
require('./init')

if (Meteor.isServer) {
  require('./server')
}

if (Meteor.isClient) {
  require('./client')
  exports.FB_API = MTR.FB_API
}
