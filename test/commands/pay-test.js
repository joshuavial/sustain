/* global describe, afterEach */
var CommandTester = require('../lib/command-tester')
var sustainFixture = require('../lib/sustain-fixture-manager')

var payCommand = require('../../commands/pay')
var commandTester = new CommandTester(payCommand, [])

process.chdir(__dirname + '/..')

describe('pay', function () {
  afterEach(function () { sustainFixture.cleanup() })
  commandTester.requiresSustainFile()
})
