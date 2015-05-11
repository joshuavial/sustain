/* global describe, it, afterEach */
var expect = require('chai').expect

var CommandTester = require('./lib/shared')
var validAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

var add = require('../commands/add')
var sharedTester = new CommandTester(add, ['username', validAddress])

process.chdir(__dirname)

describe('add', function () {
  afterEach(function () {
    packageFixture.cleanup()
  })
  sharedTester.requiresPackageFile()
  sharedTester.requireSustainField()
  sharedTester.handlesInvalidArgs([])

  it('updates package.json with contributors details', function (done) {
    packageFixture.setup('basic')
    add('username', validAddress, function () {
      expect(packageFixture.read().sustain.contributors[0]).to.deep.equal({
        name: 'username',
        address: validAddress,
        weight: 1
      })
      done()
    })
  })

})
