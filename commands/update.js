var packageFs = require('../lib/package-fs')
var readDependencies = require('../lib/read-dependencies')

module.exports = function (cb) {
  if (checkError.apply(this, arguments)) { return }

  packageFs.read('.', function (err, json) {
    if (packageFs.checkError(err, cb)) { return }
    if (packageFs.noSustainData(json, cb)) { return }

    buildDependencies(function (err, dependencies) {
      if (err) { return cb(err)}
      json.sustain.dependencies = json.sustain.dependencies || {}
      json = buildDependencyJSON(json, dependencies)
      packageFs.write(process.cwd(), json, cb)
    })
  })
}

function checkError (cb) {
  cb = arguments[arguments.length - 1]
  if (arguments.length !== 1) {
    cb(new Error('Does not take arguments.'))
    return true
  }
  return false
}

function buildDependencyJSON (json, dependencies) {
  dependencies.forEach(function (dep) {
    var parts = dep.replace('├── ', '').replace('└── ', '').split('@')
    var packageName = parts[0]
    if (packageName !== '') {
      json.sustain.dependencies[packageName] = {
        version: parts[1],
        weight: weightFor(packageName, json.sustain.dependencies)
      }
    }
  })
  return json
}
function buildDependencies (cb) {
  readDependencies(function (err, contents) {
    if (err) {return cb(err)}
    var deps = contents.split('\n')
    deps.shift()
    cb(null, deps)
  })
}

function weightFor (packageName, dependencies) {
  if (dependencies[packageName] && dependencies[packageName].weight) {
    return dependencies[packageName].weight
  }
  return 1
}
