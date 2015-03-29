#!/usr/bin/env node

var cli = require('commist')()

var lib = require('../lib')

Object.keys(lib).forEach(function (cmdName) {
  cli.register(cmdName, runner(lib[cmdName]))
})

var result = cli.parse(process.argv.splice(2))

if (result) {
  console.log(usage())
}

function usage () {
  return [
    'Usage: sustain [command] [args ...]',
    '',
    '  Commands:',
    '  - init [bitcoin address]'
  ].join('\n')
}

function runner (cmd) {
  return function (args) {
    args.push(function (err) {
      if (err) {
        console.error(err.message)
        console.log()
        console.log(usage())
      }
    })
    cmd.apply(this, args)
  }
}
