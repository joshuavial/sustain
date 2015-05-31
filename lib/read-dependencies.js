var exec = require('child_process').exec

module.exports = function (done) {
  exec('npm list --depth 0', function (err, stdout, stderr) {
    if (err) {return done(err)}
    done(null, stdout)
  })
}
