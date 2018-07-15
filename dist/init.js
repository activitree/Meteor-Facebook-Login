/* globals MTR */
'use strict'

if (typeof global !== 'undefined' && typeof global.MTR === 'undefined') {
  global.MTR = {}
}
if (typeof window !== 'undefined' && typeof window.MTR === 'undefined') {
  window.MTR = {}
}

MTR.FB_API = {}
