#!/usr/bin/env node
const Preferences = require('preferences')
const inquirer = require('inquirer')
const discord = require('./discord')

const prefs = new Preferences('discord.js-repl')

!(async () => {
  let choice = await selectAccount(prefs)
  if (choice === 'new') choice = await askToken()
  discord(choice, prefs)
})()

async function selectAccount(prefs) {
  const accounts = Object.entries(prefs).map(([name, value]) => ({ name, value }))
  const { token } = await inquirer.prompt({
    type: 'list',
    name: 'token',
    message: 'Select account to log in',
    choices: [...accounts, { name: 'Register new account', value: 'new' }],
  })
  return token
}

async function askToken() {
  const { token } = await inquirer.prompt({
    type: 'input',
    name: 'token',
    message: 'Enter your Discord token',
    validate: val => val ? true : 'Please enter your Discord token',
  })
  return token
}

process.on('unhandledRejection', err => console.log(err))
