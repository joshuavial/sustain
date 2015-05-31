var addressRegex = require('bitcoin-regex')({ exact: true })
var extend = require('xtend')
var sustainFs = require('../lib/sustain-fs')

module.exports = function (address, done) {
  if (checkError.apply(this, arguments)) {return}

  var cwd = process.cwd()

  sustainFs.read(cwd, function (err, json) {
    if (err) { json = {} }

    json = extend(json, {
      address: address
    })

    sustainFs.write(cwd, json, done)
  })
}

function checkError (address, done) {
  done = arguments[arguments.length - 1]
  if (arguments.length !== 2) {
    done(new Error('Not enough arguments.'))
    return true
  }

  if (!addressRegex.test(address)) {
    done(new Error('Given address is invalid.'))
    return true
  }
  return false
}
