var fs = require('fs')
var Path = require('path')
var addressRegex = require('bitcoin-regex')({ exact: true })
var sortObject = require('sorted-object')
var extend = require('xtend')

module.exports = function (address, cb) {
  if (!addressRegex.test(address)) {
    return cb(new Error('Given address is invalid.'))
  }

  var cwd = process.cwd()

  // read existing package.json
  read(cwd, function (err, json) {
    if (err) { return cb(err) }

    // write address to sustain
    json.sustain = extend(json.sustain || {}, {
      address: address
    })

    write(cwd, json, cb)
  })
}

function read (dir, cb) {
  fs.readFile(
    Path.join(dir, 'package.json'),
    'utf8',
    function (err, contents) {
      if (err) { return cb(err) }
      cb(null, JSON.parse(contents))
    }
  )
}

function write (dir, json, cb) {
  fs.writeFile(
    Path.join(dir, 'package.json'),
    JSON.stringify(
      sortObject(json), null, 2
    ),
    cb
  )
}
