const { afterEach, beforeEach, expect } = require('@jest/globals')
const mock  = require('mock-fs')

const Table = require('./Table')
const TableDoesNotExistsError = require('./errors/TableDoesNotExistsError')

describe('#readData', () => {
  describe('WIth nonexisting table name', () => {
     beforeEach(() => mock({ data: {} }))
     afterEach(mock.restore)

     test('It throws TableDoesNotExistsError', async () => {
      const table = new Table('table')
      await expect(table.readData()).rejects.toThrow(TableDoesNotExistsError)
     })
  })
})
