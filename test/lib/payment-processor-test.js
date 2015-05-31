/* global describe, it, beforeEach */
var expect = require('chai').expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

var explorers = require('bitcore-explorers')
var insight = new explorers.Insight()
sinon.stub(explorers, 'Insight').returns(insight)

var PaymentProcessor = proxyquire('../../lib/payment-processor', {
  'bitcore-explorers': explorers
})

describe('PaymentProcessor', function () {
  var processor
  sinon.stub(insight, 'getUnspentUtxos').callsArgWith(1, null, [
    {satoshis: 500000}, {satoshis: 8000000}
  ])

  beforeEach(function () {
    processor = new PaymentProcessor('123')
  })

  it('loads an address from sustain.json', function () {
    expect(processor.address).to.equal('123')
  })
  it('converts balance to BTC', function (done) {
    processor.loadBalance(function () {
      expect(insight.getUnspentUtxos).to.have.been.called
      expect(processor.balance).to.equal(0.085)
      done()
    })
  })
})
