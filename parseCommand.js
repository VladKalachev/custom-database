const parseInsertCommand = require("./parsers/insert")
const parseSelectCommand = require("./parsers/select")
const parseWhereCommand = require("./parsers/where")
const InvalidCommandError = require('./errors/InvalidCommandError')

const parsers = [
  parseInsertCommand,
  parseSelectCommand,
]

module.exports = async function parseCommand(commandString) {
  const command = parsers
      .map(parser => parser(commandString))
      .find(command => command != null)

  if (command == null) throw new InvalidCommandError(commandString)

  const whereCommand = parseWhereCommand(commandString)
  return await command.perform(whereCommand)
}