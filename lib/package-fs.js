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
  }
}
