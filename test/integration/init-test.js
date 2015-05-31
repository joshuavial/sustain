/* global describe, it, beforeEach, afterEach */
var exec = require('child_process').exec
var expect = require('chai').expect
var validAddress = require('../fixtures/test-address')
var sustainFixture = require('../helpers/sustain-fixture-manager')

process.chdir(__dirname + '/..')

describe('init [integration]', function () {
  beforeEach(function () { sustainFixture.setup('empty')})
  afterEach(function () { sustainFixture.cleanup() })

  it('creates the sustain field correctly', function (done) {
    exec('../bin/cli.js init ' + validAddress, function () {
      expect(sustainFixture.read()).to.deep.equal({
        address: validAddress // random test address
      })
      done()
    })
  })
})
