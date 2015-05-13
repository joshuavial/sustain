var packageFs = require('../lib/package-fs')

var UpdateCommand = function () {

}

UpdateCommand.prototype = {
  call: function (cb) {
    if (checkError.apply(this, arguments)) { return }

    var cwd = process.cwd()

    // read existing package.json
    packageFs.read(cwd, function (err, json) {
      if (packageFs.checkError(err, cb)) { return }
      if (packageFs.noSustainData(json, cb)) { return }

      json.sustain.dependencies = json.sustain.dependencies || []

      packageFs.write(cwd, json, cb)
    })
  }
}

module.exports = UpdateCommand

function checkError (cb) {
  cb = arguments[arguments.length - 1]
  if (arguments.length !== 1) {
    cb(new Error('Does not take arguments.'))
    return true
  }
  return false
}
