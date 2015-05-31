var sustainFs = require('../lib/sustain-fs')
var PayeeCalculator = require('../lib/payeeCalculator')

module.exports = function (done) {
  var cwd = process.cwd()
  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, done)) { return }

    var calculator = new PayeeCalculator(json)

    done(null, {payees: calculator.payees})
  })
}
