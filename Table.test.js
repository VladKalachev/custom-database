const { afterEach, beforeEach, expect } = require('@jest/globals')
const mock  = require('mock-fs')

const Table = require('./Table')
const TableDoesNotExistsError = require('./errors/TableDoesNotExistError')

describe('#readData', () => {
  // describe('With nonexisting table name', () => {
  //    beforeEach(() => mock({ data: {} }))
  //    afterEach(mock.restore)

  //    test('It throws TableDoesNotExistsError', async () => {
  //     const table = new Table('table')
  //     expect(await table.readData()).rejects.toThrow(TableDoesNotExistsError)
  //    })
  // })

  describe('With an existing table name', () => {
    const data = [
      { a: 1, b: 2 },
      { a: 3, b: 4 }
    ]
    beforeEach(() => mock({ data: { "table.json": JSON.stringify(data) } }))
    afterEach(mock.restore)

    test('It gets all the data in the table', async () => {
     const table = new Table("table")
     expect(await table.readData()).toIncludeSameMembers(data)
    })
  })
})
