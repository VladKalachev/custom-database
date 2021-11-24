const InsertCommand = require('../commands/insertCommand')

// INSERT { "a": 1 } INTO tableName

const INSERT_COMMAND = 'INSERT'
const BEFORE_TABLE_COMMAND = 'INTO'
const REGEX = new RegExp(`${INSERT_COMMAND}\\s+(?<record>{.*})\\s+${BEFORE_TABLE_COMMAND}\\s+(?<tableName>\\S+)`)

function parseInsertCommand(commandString) {
  const regexMatch = commandString.match(REGEX)
  if(regexMatch == null) return

  const record = safeParseJSON(regexMatch.groups.record)
  if (record == null) return

  const tableName = regexMatch.groups.tableName

  return new InsertCommand({
    record,
    tableName
  })
}

function safeParseJSON(string) {
  try {
    return JSON.parse(string)
  } catch (error) {
    return 
  }
}

module.exports = parseInsertCommand