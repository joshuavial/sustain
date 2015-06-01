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

    if (utxos.length > 0) {
      var satoshis = utxos.reduce(function (previous, current) { return previous.satoshis + current.satoshis })
      processor.balance = bitcore.Unit.fromSatoshis(satoshis).to(BTC)
    } else {
      processor.balance = 0
    }

    done(null, utxos)
  })
}

PaymentProcessor.prototype.distribute = function (done) {
  var processor = this
  this.loadBalance(function (err, utxos) {
    if (err) {done(err)}
    if (processor.balance === 0) {
      if (done) {
        return done('Account balance is 0')
      } else {
        return
      }
    }

    var transaction = new bitcore.Transaction()
      .from(utxos)
    if (done) {done(transaction)}
  })
}
