/* global describe, afterEach, it */
var expect = require('chai').expect

var CommandTester = require('../lib/command-tester')
var packageFixture = require('../lib/package-fixture-manager')

var UpdateCommand = require('../../commands/update')
var sharedTester = new CommandTester(new UpdateCommand(), [])

process.chdir(__dirname + '/..')

describe('update', function () {
  afterEach(function () {
    packageFixture.cleanup()
  })
  sharedTester.requiresPackageFile()
  sharedTester.requireSustainField()

  it('loads installed packages', function () {
    packageFixture.setup('basic')
    expect(packageFixture.read().sustain.dependencies[0]).to.deep.equal({
      package: 'bitcoin-regex',
      version: '1.1.0'
    })
  })

})
