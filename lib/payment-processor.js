var Insight = require('bitcore-explorers').Insight
var bitcore = require('bitcore')
var insight = new Insight()

var BTC = bitcore.Unit.BTC

module.exports = PaymentProcessor

function PaymentProcessor (address) {
  this.address = address
}

PaymentProcessor.prototype.loadBalance = function (done) {
  var processor = this
  insight.getUnspentUtxos(this.address, function (err, utxos) {
    if (err) {done(err)}

    var satoshis = utxos.reduce(function (previous, current) { return previous.satoshis + current.satoshis })
    processor.balance = bitcore.Unit.fromSatoshis(satoshis).to(BTC)
    done()
  })
}
