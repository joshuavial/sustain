var expect = require('chai').expect
var packageFixture = require('./package-fixture-manager')

/* global it */
var CommandTester = function (command, validArgs, invalidArgs) {
  this.command = command
  this.validArgs = validArgs
  this.invalidArgs = invalidArgs
}
CommandTester.prototype.handlesInvalidArgs = function (invalidArgs) {
  var tester = this
  it('errors when arguments are invalid', function (done) {
    packageFixture.setup('basic')
    var fullInvalidArgs = invalidArgs.concat([function (err) {
      expect(err.message).to.equal('Not enough arguments.')
      done()
    }])
    tester.command.apply(this, fullInvalidArgs)
  })
}
CommandTester.prototype.requiresPackageFile = function () {
  var tester = this
  it('errors if there is no package.json', function (done) {
    packageFixture.cleanup()
    var validArgs = tester.validArgs.concat([function (err) {
      expect(err.message).to.equal('No package.json in current directory.')
      done()
    }])
    tester.command.apply(this, validArgs)
  })
}
CommandTester.prototype.requireSustainField = function () {
  var tester = this
  it('displays error if no sustain field in package.json', function (done) {
    packageFixture.setup('empty')
    var validArgs = tester.validArgs.concat([function (err) {
      expect(err.message).to.equal('No sustain data in package.json.')
      done()
    }])
    tester.command.apply(this, validArgs)
  })
}

module.exports = CommandTester
