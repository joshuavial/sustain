/* global describe, it, afterEach, beforeEach */
var expect = require('chai').expect
var standardParamTests = require('./lib/param-test')

var validAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

var init = require('../commands/init')

standardParamTests(init, 'init', [], [validAddress])
process.chdir(__dirname)

describe('init', function () {
  beforeEach(function () { packageFixture.setup('empty')})
  afterEach(function () { packageFixture.cleanup() })

  it('updates package.json with valid address', function (done) {
    init(validAddress, function () {
      expect(packageFixture.read().sustain).to.deep.equal({
        address: validAddress // random test address
      })
      done()
    })
  })
  it('errors when bitcoin address is invalid', function (done) {
    init('asdf', function (err) {
      expect(err.message).to.equal('Given address is invalid.')
      done()
    })
  })
})
