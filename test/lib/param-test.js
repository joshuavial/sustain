/* global describe, it */
var expect = require('chai').expect

module.exports = function (command, name, invalidArgs, validArgs) {
  describe(name + ' param-test', function () {
    it('errors with not enough aarguments', function (done) {
      invalidArgs.push(function (err) {
        expect(err.message).to.equal('Not enough arguments.')
        done()
      })
      command.apply(this, invalidArgs)
    })
    it('errors if there is no package.json', function (done) {
      validArgs.push(function (err) {
        expect(err.message).to.equal('No package.json in current directory.')
        done()
      })
      command.apply(this, validArgs)
    })
  })
}
