var addressRegex = require('bitcoin-regex')({ exact: true })
var extend = require('xtend')
var packageLoader = require('./package-loader')

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
  packageLoader.read(cwd, function (err, json) {
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

    packageLoader.write(cwd, json, cb)
  })
}
