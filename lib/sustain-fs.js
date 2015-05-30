var fs = require('fs')
var Path = require('path')
var sortObject = require('sorted-object')

module.exports = {
  read: read,
  write: write,
  findDependencyAddress: findDependencyAddress,
  checkError: checkError
}

function read (dir, cb) {
  fs.readFile(
    Path.join(dir, 'sustain.json'),
    'utf8',
    function (err, contents) {
      if (err) { return cb(err) }
      cb(null, JSON.parse(contents))
    }
  )
}
function write (dir, json, cb) {
  json = sortObject(json)

  fs.writeFile(
    Path.join(dir, 'sustain.json'),
    JSON.stringify(json, null, 2),
    cb
  )
}

function findDependencyAddress (packageName) {
  var path = Path.join(process.cwd(), 'node_modules', packageName, 'sustain.json')
  try {
    var json = JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}))
    return json.address
  } catch (err) { }
}

function checkError (err, cb) {
  if (err) {
    if (err.code === 'ENOENT') {
      cb(new Error('No sustain.json in current directory.'))
    } else {
      cb(err)
    }
    return true
  }
  return false
}
