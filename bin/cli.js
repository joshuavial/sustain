#!/usr/bin/env node

var cli = require('commist')()

var commands = require('../commands')

Object.keys(commands).forEach(function (cmdName) {
  cli.register(cmdName, runner(commands[cmdName]))
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
    '  - add [username] [bitcoin address]',
    '  - init [bitcoin address]',
    '  - update '
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
    cmd.apply(cmd, args)
  }
}
