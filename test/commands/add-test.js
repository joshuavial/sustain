/* global describe, it, afterEach */
var expect = require('chai').expect

var CommandTester = require('../helpers/command-tester')
var validAddress = require('../fixtures/test-address')
var sustainFixture = require('../helpers/sustain-fixture-manager')

var addCommand = require('../../commands/add')
var commandTester = new CommandTester(addCommand, ['username', validAddress])

process.chdir(__dirname + '/..')

describe('add', function () {
  afterEach(function () {
    sustainFixture.cleanup()
  })
  commandTester.requiresSustainFile()
  commandTester.handlesInvalidArgs([])

  it('updates sustain.json with contributors details', function (done) {
    sustainFixture.setup('basic')
    addCommand('username', validAddress, function () {
      expect(sustainFixture.read().contributors['username']).to.deep.equal({
        'address': validAddress,
        'weight': 1
      })
      done()
    })
  })

  it('updates an existing user', function (done) {
    sustainFixture.setup('weights')
    addCommand('username', '1JseKCgywLToABagTu85hZfSGLXQ1pa568', function () {
      expect(sustainFixture.read().contributors['username']).to.deep.equal({
        'address': '1JseKCgywLToABagTu85hZfSGLXQ1pa568',
        'weight': 12
      })
      done()
    })
  })
})
