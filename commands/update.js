var packageFs = require('../lib/package-fs')
var readDependencies = require('../lib/read-dependencies')
var UpdateCommand = function () { }

UpdateCommand.prototype = {
  call: function (cb) {
    if (checkError.apply(this, arguments)) { return }

    var cwd = process.cwd()

    var command = this
    // read existing package.json
    packageFs.read.apply(this, ['.', function (err, json) {
      if (packageFs.checkError(err, cb)) { return }
      if (packageFs.noSustainData(json, cb)) { return }

      command.dependencies(function (err, dependencies) {
        if (err) { return cb(err)}
        json.sustain.dependencies = json.sustain.dependencies || {}
        json = command.buildDependencyJSON(json, dependencies)
        packageFs.write(cwd, json, cb)
      })
    }])
  },
  buildDependencyJSON: function (json, dependencies) {
    dependencies.forEach(function (dep) {
      var parts = dep.replace('├── ', '').replace('└── ', '').split('@')
      if (parts[0] !== '') {
        json.sustain.dependencies[parts[0]] = {
          version: parts[1],
          weight: weightFor(parts[0], json.sustain.dependencies)
        }
      }
    })
    return json
  },
  dependencies: function (cb) {
    readDependencies(function (err, contents) {
      if (err) {return cb(err)}
      var deps = contents.split('\n')
      deps.shift()
      cb(null, deps)
    })
  }
}

module.exports = UpdateCommand

function checkError (cb) {
  cb = arguments[arguments.length - 1]
  if (arguments.length !== 1) {
    cb(new Error('Does not take arguments.'))
    return true
  }
  return false
}

function weightFor (packageName, dependencies) {
  if (dependencies[packageName] && dependencies[packageName].weight) {
    return dependencies[packageName].weight
  }
  return 1
}
