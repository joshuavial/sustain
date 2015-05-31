var sustainFs = require('../lib/sustain-fs')
var readDependencies = require('../lib/read-dependencies')

module.exports = function (done) {
  if (checkError.apply(this, arguments)) { return }

  sustainFs.read('.', function (err, json) {
    if (sustainFs.checkError(err, done)) { return }

    buildDependencies(function (err, dependencies) {
      if (err) { return done(err)}
      json.dependencies = json.dependencies || {}
      json = buildDependencyJSON(json, dependencies)
      sustainFs.write(process.cwd(), json, done)
    })
  })
}

function checkError (done) {
  done = arguments[arguments.length - 1]
  if (arguments.length !== 1) {
    done(new Error('Does not take arguments.'))
    return true
  }
  return false
}

function buildDependencyJSON (json, dependencies) {
  dependencies.forEach(function (dep) {
    var parts = dep.replace('├── ', '').replace('└── ', '').split('@')
    var packageName = parts[0]
    if (packageName !== '') {
      json.dependencies[packageName] = {
        version: parts[1],
        weight: weightFor(packageName, json.dependencies)
      }
    }
  })
  return json
}
function buildDependencies (done) {
  readDependencies(function (err, contents) {
    if (err) {return done(err)}
    var deps = contents.split('\n')
    deps.shift()
    done(null, deps)
  })
}

function weightFor (packageName, dependencies) {
  if (dependencies[packageName] && dependencies[packageName].weight) {
    return dependencies[packageName].weight
  }
  return 1
}
