const path = require('path')

const dir = (pathName) => path.join(__dirname, `../${pathName}`)

module.exports = dir