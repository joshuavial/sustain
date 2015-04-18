var exec = require('child_process').exec
var test = require('tape')
var validAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

process.chdir(__dirname) // where is the best place to put this?

test('init', function (t) {
  packageFixture.setup('empty')
  exec('../bin/cli.js init ' + validAddress, function () {
    t.deepEqual(packageFixture.read().sustain, {
      address: validAddress // random test address
    }, 'sustain field is correct')

    packageFixture.cleanup()
    t.end()
  })
})
