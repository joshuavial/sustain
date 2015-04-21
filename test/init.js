var test = require('tape')
var standardParamTests = require('./lib/param-test')
var packageFixture = require('./lib/package-fixture-manager')

var validAddress = require('./fixtures/test-address')

var init = require('../commands/init')
process.chdir(__dirname)

standardParamTests(init, 'init', [], [validAddress])

test('`init <hash>` should update package.json with valid address', function (t) {
  packageFixture.setup('empty')

  init(validAddress, function (err) {
    t.error(err, 'no error')

    t.deepEqual(packageFixture.read().sustain, {
      address: validAddress // random test address
    }, 'sustain field is correct')

    packageFixture.cleanup()
    t.end()
  })
})

test('`init <hash>` should error with invalid address', function (t) {
  packageFixture.setup('empty')

  init('asdf', function (err) {
    t.ok(err, 'invalid bitcoin address error exists')

    t.equal(err.message, 'Given address is invalid.', 'error message is correct')

    packageFixture.cleanup()
    t.end()
  })
})
