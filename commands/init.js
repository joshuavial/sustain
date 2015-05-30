var addressRegex = require('bitcoin-regex')({ exact: true })
var extend = require('xtend')
var sustainFs = require('../lib/sustain-fs')

module.exports = function (address, cb) {
  if (checkError.apply(this, arguments)) {return}

  var cwd = process.cwd()

  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, cb)) { return }

    json = extend(json || {}, {
      address: address
    })

    sustainFs.write(cwd, json, cb)
  })
}

function checkError (address, cb) {
  cb = arguments[arguments.length - 1]
  if (arguments.length !== 2) {
    cb = address
    cb(new Error('Not enough arguments.'))
    return true
  }

  if (!addressRegex.test(address)) {
    cb(new Error('Given address is invalid.'))
    return true
  }
  return false
}
