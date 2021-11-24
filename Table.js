const { v4: uuidV4 } = require('uuid')
const fs = require('fs')
const TableDoesNotExistError = require('./errors/TableDoesNotExistsError')

module.exports = class Table {
  constructor(tableName) {
    this.tableName = tableName
  }

  get filePath() {
    return `data/${this.tableName}.json`
  }

  insertRecord(record) {
    // 1. Give the recird an id
      // 2. Get current data
        // a. If the tabke exusts add the recird ti the end if the table
        // b. If the tabke dies not exist then create it and add the record
    const recirdWithId = { _id: uuidV4(), ...record }
    return new Promise((resolve, reject) => {
      this.readData()
        .catch(e => {
            if(e instanceof TableDoesNotExistError) {
              return []
            } else {
              reject(e)
            }
          })
        .then(data => {
          fs.writeFile(
            this.filePath, 
            JSON.stringify([...data, recirdWithId]), 
            error => {
              if (error) reject(error)
              resolve(recirdWithId)
          })
        })
    })
  }

  readData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (error, data) => {
        if (error) return reject(new TableDoesNotExistError(this.tableName))

        resolve(JSON.parse(data))
      })
    })
  }
}
