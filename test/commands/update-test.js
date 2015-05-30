/* global describe, afterEach, it */
var expect = require('chai').expect
var proxyquire = require('proxyquire')

var CommandTester = require('../lib/command-tester')
var sustainFixture = require('../lib/sustain-fixture-manager')
var readDependenciesMock = require('../lib/read-dependencies-mock')

var updateCommand = proxyquire('../../commands/update', {
  '../lib/read-dependencies': readDependenciesMock
})
var sharedTester = new CommandTester(updateCommand, [])

process.chdir(__dirname + '/..')

describe('update', function () {
  afterEach(function () {
    sustainFixture.cleanup()
  })
  sharedTester.requiresSustainFile()

  it('loads installed packages', function (done) {
    sustainFixture.setup('basic')
    updateCommand(function () {
      expect(sustainFixture.read().dependencies['bitcoin-regex']).to.deep.equal({
        version: '1.1.0',
        weight: 1
      })
      done()
    })
  })

  it('does not overwrite weight', function (done) {
    sustainFixture.setup('weights')
    updateCommand(function () {
      expect(sustainFixture.read().dependencies['bitcoin-regex']).to.deep.equal({
        version: '1.1.0',
        weight: 12
      })
      done()
    })
  })

  it('does not load empty strings', function (done) {
    sustainFixture.setup('basic')
    updateCommand(function () {
      expect(Object.keys(sustainFixture.read().dependencies).length).to.equal(9)
      done()
    })
  })

})
