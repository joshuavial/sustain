/* global describe, it, beforeEach, afterEach */
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = require('chai').use(sinonChai).expect

var proxyquire = require('proxyquire')

var bitcore = require('bitcore')
var explorers = require('bitcore-explorers')
var insight = new explorers.Insight()
sinon.stub(explorers, 'Insight').returns(insight)
sinon.stub(insight, 'broadcast').callsArgWith(1, null, '123456789')

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

    it('correctly sets the balance for one utxo', function (done) {
      insight.getUnspentUtxos.restore()
      sinon.stub(insight, 'getUnspentUtxos').callsArgWith(1, null, [{satoshis: 1000000}])
      processor.loadBalance(function () {
        expect(processor.balance).to.equal(0.01)
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
    sinon.stub(transaction, 'from').returnsThis()
    sinon.stub(transaction, 'to').returnsThis()
    sinon.stub(transaction, 'change').returnsThis()
    sinon.stub(transaction, 'sign').returnsThis()

    var a1 = sinon.createStubInstance(bitcore.Address)
    var a2 = sinon.createStubInstance(bitcore.Address)

    beforeEach(function () {
      process.env.SUSTAIN_WIF_KEY = 'test_key'
      this.addressStub = sinon.stub(bitcore, 'Address')
      this.addressStub.withArgs('123').returns(a1)
      this.addressStub.withArgs('456').returns(a2)
    })

    var payees = [ {address: '123', proportion: 0.2}, {address: '456', proportion: 0.8}]

    afterEach(function () {
      bitcore.Address.restore()
    })

    it('unless the balance is 0', function (done) {
      insight.getUnspentUtxos.restore()
      sinon.stub(insight, 'getUnspentUtxos').callsArgWith(1, null, [])

      processor.distribute([], function () {
        expect(bitcore.Transaction).to.not.have.been.called
        done()
      })
    })

    it('with utxos for the address', function (done) {
      processor.distribute([], function () {
        expect(transaction.from).calledWith(utxos)
        done()
      })
    })

    it('passes transaction id to callback', function (done) {
      processor.distribute([], function (e, transactionId) {
        expect(transactionId).to.equal('123456789')
        done()
      })
    })

    it('with proportional amounts for each payee', function (done) {
      var amt1 = bitcore.Unit.fromBTC(0.017 - processor.fee * 0.2).satoshis
      var amt2 = bitcore.Unit.fromBTC(0.068 - processor.fee * 0.8).satoshis

      processor.distribute(payees, function () {
        expect(transaction.to).to.have.been.calledWith(a1, amt1)
        expect(transaction.to).to.have.been.calledWith(a2, amt2)
        done()
      })
    })
    it('sends change to the same account as the transaction', function (done) {
      var a3 = sinon.createStubInstance(bitcore.Address)
      this.addressStub.withArgs('789').returns(a3)
      processor.distribute([], function () {
        expect(transaction.change).to.have.been.calledWith(a3)
        done()
      })
    })

    it('ignores payees who would receive no funds', function (done) {
      var extended_payees = payees.concat([{address: '012', weight: 0}])
      processor.distribute(extended_payees, function () {
        expect(bitcore.Address.callCount).to.equal(3)
        done()
      })
    })

    it('signed with the key in SUSTAIN_WIF_KEY', function (done) {
      processor.distribute(payees, function () {
        expect(transaction.sign).to.have.been.calledWith('test_key')
        done()
      })
    })
    it("returns error if SUSTAIN_WIF_KEY doesn't exist", function (done) {
      delete process.env.SUSTAIN_WIF_KEY
      processor.distribute(payees, function (err) {
        expect(err.message).to.equal('No SUSTAIN_WIF_KEY found in environment')
        done()
      })
    })
    it('broadcasts the transaction', function (done) {
      processor.distribute(payees, function (e, transactionId) {
        expect(insight.broadcast).to.have.been.called
        done()
      })

    })
  })
})
