var fs = require('fs')
var Path = require('path')

module.exports = function (done) {
  fs.readFile(
    Path.join(__dirname, '../fixtures/npm-ls.txt'),
    'utf8',
    function (err, contents) {
      if (err) {return done(err)}
      done(null, contents)
    }
  )
}
