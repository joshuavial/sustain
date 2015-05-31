/* global describe, afterEach */
var CommandTester = require('../helpers/command-tester')
var sustainFixture = require('../helpers/sustain-fixture-manager')

var payCommand = require('../../commands/pay')
var commandTester = new CommandTester(payCommand, [])

process.chdir(__dirname + '/..')

describe('pay', function () {
  afterEach(function () { sustainFixture.cleanup() })
  commandTester.requiresSustainFile()
})
