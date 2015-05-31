/* global describe, afterEach */
var CommandTester = require('../helpers/command-tester')
var sustainFixture = require('../helpers/sustain-fixture-manager')

var listCommand = require('../../commands/list')
var commandTester = new CommandTester(listCommand, [])

process.chdir(__dirname + '/..')

describe('list', function () {
  afterEach(function () { sustainFixture.cleanup() })
  commandTester.requiresSustainFile()
})
