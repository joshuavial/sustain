var fs = require('fs')
var Path = require('path')

module.exports = function (cb) {
  fs.readFile(
    Path.join(__dirname, '../fixtures/npm-ls.txt'),
    'utf8',
    function (err, contents) {
      if (err) {return cb(err)}
      cb(null, contents)
    }
  )
}
