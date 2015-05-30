/* global describe, afterEach, it */
var expect = require('chai').expect
var proxyquire = require('proxyquire')

var CommandTester = require('../lib/command-tester')
var packageFixture = require('../lib/package-fixture-manager')
var readDependenciesMock = require('../lib/read-dependencies-mock')

var updateCommand = proxyquire('../../commands/update', {
  '../lib/read-dependencies': readDependenciesMock
})
var sharedTester = new CommandTester(updateCommand, [])

process.chdir(__dirname + '/..')

describe('update', function () {
  afterEach(function () {
    packageFixture.cleanup()
  })
  sharedTester.requiresPackageFile()
  sharedTester.requireSustainField()

  it('loads installed packages', function (done) {
    packageFixture.setup('basic')
    updateCommand(function () {
      expect(packageFixture.read().sustain.dependencies['bitcoin-regex']).to.deep.equal({
        version: '1.1.0',
        weight: 1
      })
      done()
    })
  })

  it('does not overwrite weight', function (done) {
    packageFixture.setup('weights')
    updateCommand(function () {
      expect(packageFixture.read().sustain.dependencies['bitcoin-regex']).to.deep.equal({
        version: '1.1.0',
        weight: 12
      })
      done()
    })
  })

  it('does not load empty strings', function (done) {
    packageFixture.setup('basic')
    updateCommand(function () {
      expect(Object.keys(packageFixture.read().sustain.dependencies).length).to.equal(9)
      done()
    })
  })

})
