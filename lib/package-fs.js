var fs = require('fs')
var Path = require('path')
var sortObject = require('sorted-object')

module.exports = {
  read: function (dir, cb) {
    fs.readFile(
      Path.join(dir, 'package.json'),
      'utf8',
      function (err, contents) {
        if (err) { return cb(err) }
        cb(null, JSON.parse(contents))
      }
    )
  },
  write: function (dir, json, cb) {
    json.sustain = sortObject(json.sustain)

    fs.writeFile(
      Path.join(dir, 'package.json'),
      JSON.stringify(json, null, 2),
      cb
    )
  },
  checkError: function (err, cb) {
    if (err) {
      if (err.code === 'ENOENT') {
        cb(new Error('No package.json in current directory.'))
      } else {
        cb(err)
      }
      return true
    }
    return false
  },
  noSustainData: function (json, cb) {
    if (!json.sustain) {
      cb(new Error('No sustain data in package.json.'))
      return true
    }
    return false
  }
}
