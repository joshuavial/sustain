var sustainFs = require('../lib/sustain-fs')
var Processor = require('../lib/payment-processor')

module.exports = function (done) {
  var cwd = process.cwd()
  sustainFs.read(cwd, function (err, json) {
    if (sustainFs.checkError(err, done)) { return }
    var processor = new Processor(json.address)
    processor.loadBalance(function (err, utxos) {
      done(err, processor.balance)
    })
  })
}
