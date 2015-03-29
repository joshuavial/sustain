var fs = require('fs')
var test = require('tape')
var standardParamTests = require('./lib/param-test')

var add = require('../commands/add')
var testAddress = require('./lib/test-address')

standardParamTests(add, 'add', [], ['username', testAddress])

test('`add <hash>` should update package.json with contributors details', function (t) {
  before(0)

  t.equal(read().sustain, undefined, "package doesn't have sustain field yet")

  add('username', testAddress, function (err) {
    t.error(err, 'no error')

    t.deepEqual(read().contributors[0], {
      name: 'username',
      address: testAddress // random test address
    }, 'contributor address is correct')

    cleanup()
    t.end()
  })
})

test.skip('`add <hash>` should error with invalid address', function (t) {
  before(0)

  t.equal(read().sustain, undefined, "package doesn't have sustain field yet")

  add('asdf', function (err) {
    t.ok(err, 'error exists')

    t.equal(err.message, 'Given address is invalid.', 'error message is correct')

    cleanup()
    t.end()
  })
})

function read () {
  return JSON.parse(
    fs.readFileSync(__dirname + '/package.json')
  )
}

function before (num) {
  var packageJson = fs.readFileSync(__dirname + '/package.json.' + num)
  fs.writeFileSync(__dirname + '/package.json', packageJson)
}

function cleanup () {
  fs.unlinkSync(__dirname + '/package.json')
}
