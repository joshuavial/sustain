var exec = require('child_process').exec

module.exports = function (cb) {
  exec('npm list --depth 0', function (err, stdout, stderr) {
    if (err) {return cb(err)}
    cb(null, stdout)
  })
}
