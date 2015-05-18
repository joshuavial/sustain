/* global describe, beforeEach, afterEach, it */
var expect = require('chai').expect
var fs = require('fs')
var Path = require('path')

var CommandTester = require('../lib/command-tester')
var packageFixture = require('../lib/package-fixture-manager')

var UpdateCommand = require('../../commands/update')
var sharedTester = new CommandTester(new UpdateCommand(), [])

process.chdir(__dirname + '/..')

describe('update', function () {
  beforeEach(function () {
    this.updateCommand = new UpdateCommand()
    stubReadDependencies(this.updateCommand)
  })
  afterEach(function () {
    packageFixture.cleanup()
  })
  sharedTester.requiresPackageFile()
  sharedTester.requireSustainField()

  it('loads installed packages', function (done) {
    packageFixture.setup('basic')
    this.updateCommand.call(function () {
      expect(packageFixture.read().sustain.dependencies[0]).to.deep.equal({
        package: 'bitcoin-regex',
        version: '1.1.0',
        weight: 1
      })
      done()
    })
  })

  it('does not load empty strings', function (done) {
    packageFixture.setup('basic')
    this.updateCommand.call(function () {
      expect(packageFixture.read().sustain.dependencies.length).to.equal(9)
      done()
    })
  })

})

function stubReadDependencies (command) {
  command.readDependencies = function (cb) {
    fs.readFile(
      Path.join(__dirname, '../fixtures/npm-ls.txt'),
      'utf8',
      function (err, contents) {
        if (err) {return cb(err)}
        cb(null, contents)
      }
    )
  }
}
