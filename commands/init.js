var addressRegex = require('bitcoin-regex')({ exact: true })
var extend = require('xtend')
var packageFs = require('../lib/package-fs')

module.exports = function (address, cb) {
  if (!cb) {
    cb = address
    return cb(new Error('Not enough arguments.'))
  }

  if (!addressRegex.test(address)) {
    return cb(new Error('Given address is invalid.'))
  }

  var cwd = process.cwd()

  // read existing package.json
  packageFs.read(cwd, function (err, json) {
    if (err) {
      if (err.code === 'ENOENT') {
        return cb(new Error('No package.json in current directory.'))
      }
      return cb(err)
    }

    // write address to sustain
    json.sustain = extend(json.sustain || {}, {
      address: address
    })

    packageFs.write(cwd, json, cb)
  })
}