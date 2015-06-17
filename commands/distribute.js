var sustainFs = require('../lib/sustain-fs')
var Processor = require('../lib/payment-processor')
var Calculator = require('../lib/payee-calculator.js')

module.exports = function (done) {
  var cwd = process.cwd()
  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, done)) { return }
    sustainFs.read('.', function (err, json) {
      if (err) {done(err)}
      var processor = new Processor(json.address)
      var calculator = new Calculator(json)
      processor.distribute(calculator.payees, done)
    })
  })
}
