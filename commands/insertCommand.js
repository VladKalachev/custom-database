module.exports = class InsertCommand {
  constructor({ tableName, record }) {
    this.tableName = tableName
    this.record = record
    // console.log(this)
  }
}