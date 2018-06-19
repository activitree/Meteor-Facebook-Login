/* globals Meteor, BasMTR */

// import 'bas-meteor-utils'
import './init'
// import './lib'

if (Meteor.isServer) {
  require('./server')
}

if (Meteor.isClient) {
  require('./client')
  exports.FB_API = BasMTR.FB_API
}
