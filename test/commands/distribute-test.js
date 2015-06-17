/* global describe, afterEach */
var CommandTester = require('../helpers/command-tester')
var sustainFixture = require('../helpers/sustain-fixture-manager')

var distributeCommand = require('../../commands/distribute')
var commandTester = new CommandTester(distributeCommand, [])

process.chdir(__dirname + '/..')

describe('distribute', function () {
  afterEach(function () { sustainFixture.cleanup() })
  commandTester.requiresSustainFile()
})
