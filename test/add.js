var test = require('tape')
var standardParamTests = require('./lib/param-test')

var add = require('../commands/add')
var testAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

standardParamTests(add, 'add', [], ['username', testAddress])

test('`add <hash>` should update package.json with contributors details', function (t) {
  packageFixture.setup('empty')

  t.equal(packageFixture.read().sustain, undefined, "package doesn't have sustain field yet")

  add('username', testAddress, function (err) {
    t.error(err, 'no error')

    t.deepEqual(packageFixture.read().contributors[0], {
      name: 'username',
      address: testAddress // random test address
    }, 'contributor address is correct')

    packageFixture.cleanup()
    t.end()
  })
})

test('`add <hash>` should error with invalid address', function (t) {
  packageFixture.setup('empty')

  t.equal(packageFixture.read().sustain, undefined, "package doesn't have sustain field yet")

  add('username', 'asdf', function (err) {
    t.ok(err, 'error exists')

    t.equal(err.message, 'Given address is invalid.', 'error message is correct')

    packageFixture.cleanup()
    t.end()
  })
})
