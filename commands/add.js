var addressRegex = require('bitcoin-regex')({ exact: true })
var packageFs = require('../lib/package-fs')

module.exports = function (username, address, cb) {
  if (checkError.apply(this, arguments)) { return }

  var cwd = process.cwd()

  // read existing package.json
  packageFs.read(cwd, function (err, json) {
    if (packageFs.checkError(err, cb)) { return }
    if (packageFs.noSustainData(json, cb)) { return }

    json.sustain.contributors = json.sustain.contributors || []

    if (json.sustain.contributors.indexOf(username) >= 0) {
    } else {
      json.sustain.contributors.push({
        name: username,
        address: address,
        weight: 1
      })
    }

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
