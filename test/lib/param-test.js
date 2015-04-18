var test = require('tape')

module.exports = function (command, name, invalidArgs, validArgs) {
  console.log(command.toString())
  test('`' + name + '` should error with not enough arguments', function (t) {
    invalidArgs.push(function (err) {
      t.ok(err, 'not enough args error exists')
      t.equal(err.message, 'Not enough arguments.', 'error message is correct')
      t.end()
    })
    command.apply(this, invalidArgs)
  })

  test('`' + name + '` should error if there is not a package.json', function (t) {
    validArgs.push(function (err) {
      t.ok(err, 'no package.json error exists')
      t.equal(err.message, 'No package.json in current directory.', 'error message is correct')
      t.end()
    })
    command.apply(this, validArgs)
  })
}
