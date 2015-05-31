var addressRegex = require('bitcoin-regex')({ exact: true })
var sustainFs = require('../lib/sustain-fs')

module.exports = function (username, address, done) {
  if (checkError.apply(this, arguments)) { return }

  var cwd = process.cwd()

  // read existing sustain.json
  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, done)) { return }

    initContributors(json)
    addContributor(json, username, address)

    sustainFs.write(cwd, json, done)
  })
}

function checkError (username, address, done) {
  done = arguments[arguments.length - 1]
  if (arguments.length !== 3) {
    done(new Error('Not enough arguments.'))
    return true
  }
  if (!addressRegex.test(address)) {
    done(new Error('Given address is invalid.'))
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
