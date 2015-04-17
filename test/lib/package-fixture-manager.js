var fs = require('fs')

module.exports = {
  read: function () {
    return JSON.parse(
      fs.readFileSync(__dirname + '/../package.json')
    )
  },
  setup: function (num) {
    var packageJson = fs.readFileSync(__dirname + '/../fixtures/package.json.' + num)
    fs.writeFileSync(__dirname + '/../package.json', packageJson)
  },
  cleanup: function () {
    fs.unlinkSync(__dirname + '/../package.json')
  }
}
