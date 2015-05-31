var fs = require('fs')
var wrench = require('wrench')

module.exports = {
  read: function () {
    return JSON.parse(
      fs.readFileSync(__dirname + '/../sustain.json')
    )
  },
  setup: function (label) {
    var sustainJson = fs.readFileSync(__dirname + '/../fixtures/sustain.json.' + label)
    fs.writeFileSync(__dirname + '/../sustain.json', sustainJson)
  },
  setupNodeModules: function (label) {
    wrench.copyDirSyncRecursive(__dirname + '/../fixtures/node_modules.' + label, __dirname + '/../node_modules')
  },
  cleanup: function () {
    try {
      fs.unlinkSync(__dirname + '/../sustain.json')
    } catch (err) { }
    wrench.rmdirSyncRecursive(__dirname + '/../node_modules', 'failSilently')
  }
}
