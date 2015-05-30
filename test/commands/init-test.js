/* global describe, it, afterEach, beforeEach */
var expect = require('chai').expect

var CommandTester = require('../lib/command-tester')
var validAddress = require('../fixtures/test-address')
var packageFixture = require('../lib/package-fixture-manager')

var initCommand = require('../../commands/init')
var sharedTester = new CommandTester(initCommand, [validAddress])

process.chdir(__dirname + '/..')

describe('init', function () {
  beforeEach(function () { packageFixture.setup('empty')})
  afterEach(function () { packageFixture.cleanup() })

  sharedTester.requiresPackageFile()
  sharedTester.handlesInvalidArgs([])

  it('errors when bitcoin address is invalid', function (done) {
    initCommand('asdf', function (err) {
      expect(err.message).to.equal('Given address is invalid.')
      done()
    })
  })

  it('updates package.json with valid address', function (done) {
    initCommand(validAddress, function () {
      expect(packageFixture.read().sustain).to.deep.equal({
        address: validAddress // random test address
      })
      done()
    })
  })
})
