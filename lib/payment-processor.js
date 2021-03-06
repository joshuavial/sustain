var Insight = require('bitcore-explorers').Insight
var bitcore = require('bitcore')
var insight = new Insight()

module.exports = PaymentProcessor

function PaymentProcessor (address) {
  this.address = address
  this.fee = 0.00000677
}

PaymentProcessor.prototype.loadBalance = function (done) {
  var processor = this
  insight.getUnspentUtxos(this.address, function (err, utxos) {
    if (err) {done(err)}
    setBalance(processor, utxos)
    done(null, utxos)
  })
}

PaymentProcessor.prototype.distribute = function (payees, done) {
  var processor = this
  this.loadBalance(function (err, utxos) {
    if (err) {done(err)}
    if (processor.balance === 0) {
      return done({message: 'Account balance is 0'})
    }
    if (!process.env.SUSTAIN_WIF_KEY) {
      return done({message: 'No SUSTAIN_WIF_KEY found in environment'})
    }

    var transaction = new bitcore.Transaction().from(utxos)
    transaction = addPayees.call(processor, transaction, processor, payees)
      .change(new bitcore.Address(processor.address))
      .sign(process.env.SUSTAIN_WIF_KEY)

    insight.broadcast(transaction, function (err, returnedTxId) {
      if (err) {
        if (done) {done(err, returnedTxId)}
      } else {
        if (done) {done(null, returnedTxId)}
      }
    })
  })
}

function setBalance (processor, utxos) {
  if (utxos.length > 0) {
    var satoshis = 0
    for (var i = 0; i < utxos.length; i++) {
      satoshis = satoshis + utxos[i].satoshis
    }
    processor.balance = bitcore.Unit.fromSatoshis(satoshis).toBTC()
  } else {
    processor.balance = 0
  }
}

function addPayees (transaction, processor, payees) {
  for (var i in payees) {
    var payee = payees[i]
    if (payee.proportion > 0) {
      var address = new bitcore.Address(payee.address)
      transaction.to(
        address,
        bitcore.Unit.fromBTC((processor.balance - this.fee) * payee.proportion).satoshis
      )
    }
  }
  return transaction
}
