var fs = require('fs')
var Path = require('path')
var sortObject = require('sorted-object')

module.exports = {
  read: read,
  write: write,
  findDependencyAddress: findDependencyAddress,
  checkError: checkError
}

function read (dir, done) {
  fs.readFile(
    Path.join(dir, 'sustain.json'),
    'utf8',
    function (err, contents) {
      if (err) { return done(err) }
      done(null, JSON.parse(contents))
    }
  )
}
function write (dir, json, done) {
  json = sortObject(json)

  fs.writeFile(
    Path.join(dir, 'sustain.json'),
    JSON.stringify(json, null, 2),
    done
  )
}

function findDependencyAddress (packageName) {
  var path = Path.join(process.cwd(), 'node_modules', packageName, 'sustain.json')
  try {
    var json = JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}))
    return json.address
  } catch (err) { }
}

function checkError (err, done) {
  if (err) {
    if (err.code === 'ENOENT') {
      done(new Error('No sustain.json in current directory.'))
    } else {
      done(err)
    }
    return true
  }
  return false
}
