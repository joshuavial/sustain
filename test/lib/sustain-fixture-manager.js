var fs = require('fs')

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
  cleanup: function () {
    try {
      fs.unlinkSync(__dirname + '/../sustain.json')
    } catch (err) { }
  }
}
