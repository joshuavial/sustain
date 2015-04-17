var addressRegex = require('bitcoin-regex')({ exact: true })
var extend = require('xtend')
var packageFs = require('../lib/package-fs')

module.exports = function (username, address, cb) {
  if (checkError.apply(this, arguments)) { return }

  var cwd = process.cwd()

  // read existing package.json
  packageFs.read(cwd, function (err, json) {
    if (packageFs.checkError(err, cb)) { return }

    json.contributors = json.contributors || []

    if (json.contributors.indexOf(username) >= 0) {
    } else {
      json.contributors.push({
        name: username,
        address: address
      })
    }

    // write address to sustain
    json.sustain = extend(json.sustain || {}, {
      address: address
    })

    packageFs.write(cwd, json, cb)
  })
}

function checkError (username, address, cb) {
  cb = arguments[arguments.length - 1]
  if (arguments.length !== 3) {
    cb(new Error('Not enough arguments.'))
    return true
  }
  if (!addressRegex.test(address)) {
    cb(new Error('Given address is invalid.'))
    return true
  }
  return false
}
