#!/usr/bin/env node
const Preferences = require('preferences')
const inquirer = require('inquirer')

const prefs = new Preferences('discord.js-repl')

!(async () => {
  if (process.argv[2]) prefs.token = trimming(process.argv[2])
  if (!prefs.token) prefs.token = await askToken()
  process.env.TOKEN = prefs.token
  require('./discord')
})()

async function askToken() {
  const { token } = await inquirer.prompt({
    type: 'input',
    name: 'token',
    message: 'Enter your Discord token',
    validate: val => val ? true : 'Please enter your Discord token',
  })
  return trimming(token)
}

function trimming(str) {
  return str.trim().match(/^"?([^"]+)"?$/)[1]
}

process.on('unhandledRejection', err => console.log(err))
