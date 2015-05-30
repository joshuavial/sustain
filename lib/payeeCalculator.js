var sustainFS = require('./sustain-fs')

module.exports = function (json) {
  this.json = json
  this.totalWeight = 0
  this.payees = []
  this.incompleteDependencies = []
  buildPayees.call(this)
  calculateTotalWeights.call(this)
  calculateProportions.call(this)
}

function calculateTotalWeights () {
  for (var i in this.payees) {
    this.totalWeight += this.payees[i].weight
  }
}

function calculateProportions () {
  for (var i in this.payees) {
    var payee = this.payees[i]
    payee.proportion = parseFloat((payee.weight / this.totalWeight).toFixed(2))
  }
}

function buildPayees () {
  this.payees.concat(buildContributorPayees.call(this, this.json.contributors))
  this.payees.concat(buildDependencyPayees.call(this, this.json.dependencies))
}

function addPayee (name, address, weight) {
  this.payees.push({
    name: name,
    address: address,
    weight: weight
  })
}

function buildContributorPayees (contributors) {
  for (var name in contributors) {
    var contributor = contributors[name]
    addPayee.call(this, name, contributor.address, contributor.weight)
  }
}

function buildDependencyPayees (dependencies, cb) {
  for (var name in dependencies) {
    var address = sustainFS.findDependencyAddress(name)
    if (address) {
      addPayee.call(this, name, address, dependencies[name].weight)
    } else {
      this.incompleteDependencies.push({name: name, weight: dependencies[name].weight})
    }
  }
}
