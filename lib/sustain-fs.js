var fs = require('fs')
var Path = require('path')
var sortObject = require('sorted-object')

module.exports = {
  read: function (dir, cb) {
    fs.readFile(
      Path.join(dir, 'sustain.json'),
      'utf8',
      function (err, contents) {
        if (err) { return cb(err) }
        cb(null, JSON.parse(contents))
      }
    )
  },
  write: function (dir, json, cb) {
    json = sortObject(json)

    fs.writeFile(
      Path.join(dir, 'sustain.json'),
      JSON.stringify(json, null, 2),
      cb
    )
  },
  checkError: function (err, cb) {
    if (err) {
      if (err.code === 'ENOENT') {
        cb(new Error('No sustain.json in current directory.'))
      } else {
        cb(err)
      }
      return true
    }
    return false
  }
}
