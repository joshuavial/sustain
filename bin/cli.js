#!/usr/bin/env node

var cli = require('commist')()

var commands = require('../commands')

Object.keys(commands).forEach(function (cmdName) {
  cli.register(cmdName, runner(commands[cmdName]))
})

var result = cli.parse(process.argv.splice(2))

if (result) {
  console.log(result)
  console.log(usage())
}

function usage () {
  return [
    'Usage: sustain [command] [args ...]',
    '',
    '  Commands:',
    '  - add [username] [bitcoin address]',
    '  - balance',
    '  - distribute',
    '  - init [bitcoin address]',
    '  - list',
    '  - update '
  ].join('\n')
}

function runner (cmd) {
  return function (args) {
    args.push(function (err, output) {
      if (err) {
        console.error(err.message)
        console.log()
        console.log(usage())
      }
      if (output) {
        console.log(output)
      }
    })
    cmd.apply(cmd, args)
  }
}
