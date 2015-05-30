var sustainFs = require('../lib/sustain-fs')
var PayeeCalculator = require('../lib/payeeCalculator')

module.exports = function (cb) {
  var cwd = process.cwd()
  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, cb)) { return }

    var calculator = new PayeeCalculator(json)

    cb(null, {payees: calculator.payees})
  })
}
