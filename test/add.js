/* global describe, it, afterEach */
var expect = require('chai').expect
var standardParamTests = require('./lib/param-test')

var validAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

var add = require('../commands/add')

standardParamTests(add, 'add', [], ['username', validAddress])
process.chdir(__dirname)

describe('add', function () {
  afterEach(function () {
    packageFixture.cleanup()
  })
  it('displays error if no sustain field in package.json', function (done) {
    packageFixture.setup('empty')
    add('username', validAddress, function (err) {
      expect(err.message).to.equal('No sustain data in package.json.')
      done()
    })

  })
  it('updates package.json with contributors details', function (done) {
    packageFixture.setup('basic')
    add('username', validAddress, function () {
      expect(packageFixture.read().sustain.contributors[0]).to.deep.equal({
        name: 'username',
        address: validAddress // random test address
      })
      done()
    })
  })

  it('returns error if email address is invalid', function (done) {
    packageFixture.setup('basic')
    add('username', 'asdf', function (err) {
      expect(err.message).to.equal('Given address is invalid.')
      done()
    })
  })
})
