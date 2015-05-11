/* global describe, it, afterEach */
var expect = require('chai').expect

var packageFixture = require('./lib/package-fixture-manager')

var update = require('../commands/update')

process.chdir(__dirname)

describe('update', function () {
  afterEach(function () {
    packageFixture.cleanup()
  })
  it('displays error if no sustain field in package.json', function (done) {
    packageFixture.setup('empty')
    update(function (err) {
      expect(err.message).to.equal('No sustain data in package.json.')
      done()
    })

  })

})
