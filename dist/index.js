/* globals Meteor, BasMTR */
'use strict'

require('bas-meteor-utils')
require('./init')
// require('./lib')

if (Meteor.isServer) {
  require('./server')
}

if (Meteor.isClient) {
  require('./client')
  exports.FB_API = BasMTR.FB_API
}
