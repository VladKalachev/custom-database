const insertParser = require('./parsers/insert')

const insertCommand = insertParser('INSERT { "a": 1 } INTO test')
console.log(insertCommand)

// 1. Get user input
// 1.2. Choose our parser
// 2. Parse input
// 3. Execute data
// 4. Return data
// 5. Repeat

// SELECT + FROM test
// DELETE FROM test