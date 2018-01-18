const fs = require('fs-extra')
const path = require('./path')

const readFileToArray = (pwd) => {
  const data = fs.readFileSync(path(pwd), 'utf8')
  const dataSplit = data.split('\n')
  const dataMap = dataSplit.filter(item => item.trim() !== '').map(row => row.trim())
  return dataMap
}

module.exports = readFileToArray