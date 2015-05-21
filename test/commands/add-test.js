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
      expect(packageFixture.read().sustain.contributors['username']).to.deep.equal({
        'address': validAddress,
        'weight': 1
      })
      done()
    })
  })

  it('updates an existing user', function (done) {
    packageFixture.setup('weights')
    new AddCommand().call('username', '1JseKCgywLToABagTu85hZfSGLXQ1pa568', function () {
      expect(packageFixture.read().sustain.contributors['username']).to.deep.equal({
        'address': '1JseKCgywLToABagTu85hZfSGLXQ1pa568',
        'weight': 11
      })
      done()
    })
  })

})
