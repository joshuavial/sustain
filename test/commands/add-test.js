/* global describe, it, afterEach */
var expect = require('chai').expect

var CommandTester = require('../lib/command-tester')
var validAddress = require('../fixtures/test-address')
var packageFixture = require('../lib/package-fixture-manager')

var AddCommand = require('../../commands/add')
var commandTester = new CommandTester(new AddCommand(), ['username', validAddress])

process.chdir(__dirname + '/..')

describe('add', function () {
  afterEach(function () {
    packageFixture.cleanup()
  })
  commandTester.requiresPackageFile()
  commandTester.requireSustainField()
  commandTester.handlesInvalidArgs([])

  it('updates package.json with contributors details', function (done) {
    packageFixture.setup('basic')
    new AddCommand().call('username', validAddress, function () {
      expect(packageFixture.read().sustain.contributors[0]).to.deep.equal({
        name: 'username',
        address: validAddress,
        weight: 1
      })
      done()
    })
  })

})
