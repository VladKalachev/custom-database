const readline = require('readline')
const parseCommand = require('./parseCommand')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function start() {
  while(true) {
    try {
      const commandString = await waitForCommand()
      printFormattedJSON(await parseCommand(commandString))
    } catch (e) {
      console.error(`${e.name}: ${e.message}`)
    }
  }

}

start()

function waitForCommand() {
  return new Promise(resolve => {
    rl.question("> ", resolve)
  })
}

function printFormattedJSON(string) {
  console.log(JSON.stringify(string, null, 2))
}

// 1. Get user input
// 1.2. Choose our parser
// 2. Parse input
// 3. Execute data
// 4. Return data
// 5. Repeat

// SELECT + FROM test
// DELETE FROM test