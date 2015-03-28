var fs = require('fs')
var addressRegex = require('bitcoin-regex')({ exact: true })

module.exports = function (address, cb) {
  if (!addressRegex.test(address)) {
    return cb(new Error('Given address is invalid.'))
  }

  // read existing package.json

}
