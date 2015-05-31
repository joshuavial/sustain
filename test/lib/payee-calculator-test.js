/* global describe, it, beforeEach, afterEach */
var expect = require('chai').expect
var sustainFixture = require('../helpers/sustain-fixture-manager')
var PayeeCalculator = require('../../lib/payee-calculator')

process.chdir(__dirname + '/..')

describe('PayeeCalculator', function () {
  beforeEach(function () {
    sustainFixture.setup('weights')
    sustainFixture.setupNodeModules('weights')
    this.calculator = new PayeeCalculator(sustainFixture.read())
  })

  afterEach(function () { sustainFixture.cleanup() })

  it('calculates the total weights', function () {
    expect(this.calculator.totalWeight).to.equal(20)
  })

  it('includes contributors', function () {
    expect(this.calculator.payees[0].name).to.equal('username')
  })

  it('includes dependecies which have a sustain address', function () {
    expect(this.calculator.payees[1].name).to.equal('packageWithSustain')
  })
  it('includes a payment address for each payee', function () {
    expect(this.calculator.payees[0]).to.have.property('address')
    expect(this.calculator.payees[1]).to.have.property('address')
  })
  it('calculates the proportion of payments for each payee', function () {
    expect(this.calculator.payees[0].proportion).to.equal(0.6)
    expect(this.calculator.payees[1].proportion).to.equal(0.4)
  })
  it('rounds the proportion to two decimal places', function () {
    var calculator = new PayeeCalculator({
      contributors: {
        '1': {weight: 1},
        '2': {weight: 2}
      }
    })
    expect(calculator.payees[0].proportion).to.equal(0.33)
    expect(calculator.payees[1].proportion).to.equal(0.67)
  })
  describe('dependencies without a sustain address', function () {
    it('are not included in payees', function () {
      expect(this.calculator.payees.length).to.equal(2)
    })
    it('are stored in incompleteDependencies array', function () {
      expect(this.calculator.incompleteDependencies[0].name).to.equal('bitcoin-regex')
    })
  })
})
