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

PaymentProcessor.prototype.distribute = function (payees, done) {
  var processor = this
  this.loadBalance(function (err, utxos) {
    if (err) {done(err)}
    if (processor.balance === 0) {
      return done('Account balance is 0')
    }

    var transaction = new bitcore.Transaction()
      .from(utxos)
    transaction = addPayees(transaction, processor, payees)
      .change(new bitcore.Address(processor.address))

    if (done) {done(transaction)}
  })
}

function addPayees (transaction, processor, payees) {
  for (var i in payees) {
    var payee = payees[i]
    var address = new bitcore.Address(payee.address)
    transaction.to(
      address,
      bitcore.Unit.fromBTC(processor.balance * payee.proportion).satoshis
    )
  }
  return transaction
}
