/* global describe, it, beforeEach, afterEach */
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = require('chai').use(sinonChai).expect

var proxyquire = require('proxyquire')

var bitcore = require('bitcore')
var explorers = require('bitcore-explorers')
var insight = new explorers.Insight()
sinon.stub(explorers, 'Insight').returns(insight)

var PaymentProcessor = proxyquire('../../lib/payment-processor', {
  'bitcore-explorers': explorers
})

describe('PaymentProcessor', function () {
  var processor
  var utxos = [ {satoshis: 500000}, {satoshis: 8000000} ]

  beforeEach(function () {
    processor = new PaymentProcessor('789')
    sinon.stub(insight, 'getUnspentUtxos').callsArgWith(1, null, utxos)
  })

  afterEach(function () {
    insight.getUnspentUtxos.restore()
  })

  it('loads an address from sustain.json', function () {
    expect(processor.address).to.equal('789')
  })
  describe('#loadBalance', function () {
    it('sets balance to 0 if utxos is empty', function (done) {
      insight.getUnspentUtxos.restore()
      sinon.stub(insight, 'getUnspentUtxos').callsArgWith(1, null, [])

      processor.loadBalance(function () {
        expect(processor.balance).to.equal(0)
        done()
      })
    })
    it('converts balance to BTC', function (done) {
      processor.loadBalance(function () {
        expect(insight.getUnspentUtxos).to.have.been.called
        expect(processor.balance).to.equal(0.085)
        done()
      })
    })
    it('sends utxos to call back', function (done) {
      processor.loadBalance(function (e, returnedUtxos) {
        expect(returnedUtxos).to.equal(utxos)
        done()
      })
    })
  })
  describe('#pay creates a transaction', function () {
    var transaction = new bitcore.Transaction()
    sinon.stub(bitcore, 'Transaction').returns(transaction)
    sinon.stub(transaction, 'from').returns(transaction)
    sinon.stub(transaction, 'to').returns(transaction)
    sinon.stub(transaction, 'change').returns(transaction)
    sinon.stub(transaction, 'sign').returns(transaction)

    var a1 = sinon.createStubInstance(bitcore.Address)
    var a2 = sinon.createStubInstance(bitcore.Address)
    var stub = sinon.stub(bitcore, 'Address')
    stub.withArgs('123').returns(a1)
    stub.withArgs('456').returns(a2)

    var payees = [ {address: '123', proportion: 0.2}, {address: '456', proportion: 0.8}]

    it('unless the balance is 0', function (done) {
      insight.getUnspentUtxos.restore()
      sinon.stub(insight, 'getUnspentUtxos').callsArgWith(1, null, [])

      processor.distribute([], function () {
        expect(bitcore.Transaction).to.not.have.been.called
        done()
      })
    })

    it('with utxos for the address', function (done) {
      processor.distribute(payees, function () {
        expect(transaction.from).calledWith(utxos)
        done()
      })
    })
    it('with proportional amounts for each payee', function (done) {
      processor.distribute(payees, function () {
        expect(transaction.to).to.have.been.calledWith(a1, 1700000)
        expect(transaction.to).to.have.been.calledWith(a2, 6800000)
        done()
      })
      bitcore.Address.restore()
    })
    it('sends change to the same account as the transaction', function (done) {
      var a3 = sinon.createStubInstance(bitcore.Address)
      var stub = sinon.stub(bitcore, 'Address')
      stub.withArgs('789').returns(a3)
      processor.distribute([], function () {
        expect(transaction.change).to.have.been.calledWith(a3)
        done()
      })
      bitcore.Address.restore()
    })
    it('signed with the key in SUSTAIN_WIF_KEY')
  })
})
