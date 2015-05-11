var fs = require('fs')

module.exports = {
  read: function () {
    return JSON.parse(
      fs.readFileSync(__dirname + '/../package.json')
    )
  },
  setup: function (label) {
    var packageJson = fs.readFileSync(__dirname + '/../fixtures/package.json.' + label)
    fs.writeFileSync(__dirname + '/../package.json', packageJson)
  },
  cleanup: function () {
    try {
      fs.unlinkSync(__dirname + '/../package.json')
    } catch (err) { }
  }
}
