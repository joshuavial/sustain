/* global describe, it, afterEach, beforeEach */
var expect = require('chai').expect

var CommandTester = require('./lib/shared')
var validAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

var init = require('../commands/init')
var sharedTester = new CommandTester(init, [validAddress])

process.chdir(__dirname)

describe('init', function () {
  beforeEach(function () { packageFixture.setup('empty')})
  afterEach(function () { packageFixture.cleanup() })

  sharedTester.requiresPackageFile()
  sharedTester.handlesInvalidArgs([])

  it('errors when bitcoin address is invalid', function (done) {
    init('asdf', function (err) {
      expect(err.message).to.equal('Given address is invalid.')
      done()
    })
  })

  it('updates package.json with valid address', function (done) {
    init(validAddress, function () {
      expect(packageFixture.read().sustain).to.deep.equal({
        address: validAddress // random test address
      })
      done()
    })
  })
})
