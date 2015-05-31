var sustainFs = require('../lib/sustain-fs')

module.exports = function (done) {
  var cwd = process.cwd()
  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, done)) { return }

    done(null)
  })
}
