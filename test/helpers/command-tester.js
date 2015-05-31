var expect = require('chai').expect
var sustainFixture = require('./sustain-fixture-manager')

/* global it */
var CommandTester = function (command, validArgs, invalidArgs) {
  this.command = command
  this.validArgs = validArgs
  this.invalidArgs = invalidArgs
}
CommandTester.prototype.handlesInvalidArgs = function (invalidArgs) {
  var tester = this
  it('errors when arguments are invalid', function (done) {
    sustainFixture.setup('basic')
    var fullInvalidArgs = invalidArgs.concat([function (err) {
      expect(err.message).to.equal('Not enough arguments.')
      done()
    }])
    tester.command.apply(this, fullInvalidArgs)
  })
}
CommandTester.prototype.requiresSustainFile = function () {
  var tester = this
  it('errors if there is no sustain.json', function (done) {
    sustainFixture.cleanup()
    var validArgs = tester.validArgs.concat([function (err) {
      expect(err.message).to.equal('No sustain.json in current directory.')
      done()
    }])
    tester.command.apply(this, validArgs)
  })
}

module.exports = CommandTester
