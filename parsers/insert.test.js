const parseInsertCommand = require('./insert')

describe("With a valid record", () => {
  const command = 'INSERT { "a": 1, "b": 2 } INTO table' 
  test('It returns correct InsertCommand', () => {
    const insertCommand = parseInsertCommand(command)
    expect(insertCommand.record).toEqual({ a: 1, b: 2 })
    expect(insertCommand.tableName).toEqual("table")
  })
})

describe("With a invalid record", () => {
  const command = 'INSERT { asdfasd } INTO table' 
  test('It returns undefined', () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})

describe("With on table name", () => {
  const command = 'INSERT { "a": 1, "b": 2  } INTO' 
  test('It returns undefined', () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})

describe("With on INSERT clause", () => {
  const command = '{ "a": 1, "b": 2  } INTO' 
  test('It returns undefined', () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})

describe("With on INTO clause", () => {
  const command = 'INSERT { "a": 1, "b": 2  } table' 
  test('It returns undefined', () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})