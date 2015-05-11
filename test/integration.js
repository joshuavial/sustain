/* global describe, it, beforeEach, afterEach */
var exec = require('child_process').exec
var expect = require('chai').expect
var validAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

process.chdir(__dirname)

describe('init [integration]', function () {
  beforeEach(function () { packageFixture.setup('empty')})
  afterEach(function () { packageFixture.cleanup() })

  it('creates the sustain field correctly', function (done) {
    exec('../bin/cli.js init ' + validAddress, function () {
      expect(packageFixture.read().sustain).to.deep.equal({
        address: validAddress // random test address
      })
      done()
    })
  })
})
