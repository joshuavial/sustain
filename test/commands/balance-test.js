/* global describe, afterEach, it*/
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = require('chai').use(sinonChai).expect

var CommandTester = require('../helpers/command-tester')
var sustainFixture = require('../helpers/sustain-fixture-manager')

var Processor = require('../../lib/payment-processor')
var processor = new Processor()
var proxyquire = require('proxyquire')

var balanceCommand = proxyquire('../../commands/balance', {
  '../lib/payment-processor': function () {
    return processor
  }
})
var commandTester = new CommandTester(balanceCommand, [])
processor.balance = 0.1
sinon.stub(processor, 'loadBalance').callsArgWith(0, null, [])

process.chdir(__dirname + '/..')

describe('balance', function () {
  afterEach(function () { sustainFixture.cleanup() })
  commandTester.requiresSustainFile()

  it('loads the balance', function (done) {
    sustainFixture.setup('basic')
    balanceCommand(function (e, balance) {
      expect(balance).to.equal(0.1)
      done()
    })
  })
})
