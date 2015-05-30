var addressRegex = require('bitcoin-regex')({ exact: true })
var sustainFs = require('../lib/sustain-fs')

module.exports = function (username, address, cb) {
  if (checkError.apply(this, arguments)) { return }

  var cwd = process.cwd()

  // read existing sustain.json
  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, cb)) { return }

    initContributors(json)
    addContributor(json, username, address)

    sustainFs.write(cwd, json, cb)
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

function initContributors (json) {
  json.contributors = json.contributors || {}
}

function addContributor (json, username, address) {
  if (!json.contributors[username]) {
    json.contributors[username] = {}
  }
  json.contributors[username]['address'] = address
  if (!json.contributors[username].weight) {
    json.contributors[username].weight = 1
  }
}
