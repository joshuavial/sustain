/* global describe, it, afterEach, beforeEach */
var expect = require('chai').expect

var CommandTester = require('../lib/command-tester')
var validAddress = require('../fixtures/test-address')
var sustainFixture = require('../lib/sustain-fixture-manager')

var initCommand = require('../../commands/init')
var sharedTester = new CommandTester(initCommand, [validAddress])

process.chdir(__dirname + '/..')

describe('init', function () {
  beforeEach(function () { sustainFixture.setup('empty')})
  afterEach(function () { sustainFixture.cleanup() })

  sharedTester.handlesInvalidArgs([])

  it('errors when bitcoin address is invalid', function (done) {
    initCommand('asdf', function (err) {
      expect(err.message).to.equal('Given address is invalid.')
      done()
    })
  })

  it('updates sustain.json with valid address', function (done) {
    initCommand(validAddress, function () {
      expect(sustainFixture.read()).to.deep.equal({
        address: validAddress // random test address
      })
      done()
    })
  })
})
