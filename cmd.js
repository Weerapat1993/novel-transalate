const fs = require('fs-extra')
const shell = require('shelljs')
const chalk = require('chalk')
const cmd = require('node-cmd')
const translate = require('google-translate-api')
const fileTransalate = require('./src/commands/transalate')
const { path, asyncForEach } = require('./src/utils')

const data = fs.readFileSync(path('/data/test.md'), 'utf8')
const dataSplit = data.split('\n')
const dataMap = dataSplit.filter(item => item.trim() !== '').map(row => row.trim())

const renderRow = async (row) => {
  const textRow = await translate(row, { from: 'en', to: 'th'})
  const textMessage = `${row}\n+ ${textRow.text}\n\n`

  // console.log(textMessage)
  // console.log(chalk.green(textRow.text))
  // console.log('')
  return textMessage
}

const runFunction = (pwd) => {
  let fullText = ''
  console.log('')
  console.log('Transalating ...')
  console.log('')
  asyncForEach(dataMap, async (row, index) => {
    fullText += await renderRow(row)
    if(index === dataMap.length - 1){
      // console.log(fullText)
      fileTransalate(null, fullText, pwd)
    }
  })
}

// Run Function
let pwd

cmd.get('pwd', (err, data, stderr) => {
  pwd = data.replace(new RegExp('\n','g'), '')
  runFunction(pwd)
})