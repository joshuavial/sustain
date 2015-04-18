var test = require('tape')
var standardParamTests = require('./lib/param-test')

var add = require('../commands/add')
var validAddress = require('./fixtures/test-address')
var packageFixture = require('./lib/package-fixture-manager')

standardParamTests(add, 'add', [], ['username', validAddress])

test('`add <username> <hash>` displays error if no sustain field in package.json', function (t) {
  packageFixture.setup('empty')
  add('username', validAddress, function (err) {
    t.ok(err, 'error message exists')
    t.equal(err.message, 'No sustain data in package.json.', 'error message is correct')
    packageFixture.cleanup()
    t.end()
  })
})

test('`add <username> <hash>` should update package.json with contributors details', function (t) {
  packageFixture.setup('basic')

  add('username', validAddress, function (err) {
    t.error(err, 'no error')

    t.deepEqual(packageFixture.read().sustain.contributors[0], {
      name: 'username',
      address: validAddress // random test address
    }, 'contributor address is correct')

    packageFixture.cleanup()
    t.end()
  })
})

test('`add <hash>` should error with invalid address', function (t) {
  packageFixture.setup('basic')

  add('username', 'asdf', function (err) {
    t.ok(err, 'invalid address error exists')

    t.equal(err.message, 'Given address is invalid.', 'error message is correct')

    packageFixture.cleanup()
    t.end()
  })
})
