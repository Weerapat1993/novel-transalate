const chalk = require('chalk')
const translate = require('google-translate-api')
const fileTransalate = require('./src/commands/transalate')
const { asyncForEach, readFileToArray } = require('./src/utils')

const renderRow = async (row) => {
  const textRow = await translate(row, { from: 'en', to: 'th'})
  const textEng = row.split('.').map(text => `${text.trim()}.`)
  const textEngJoin = textEng.length <= 1 ? textEng.join('\n') : textEng.slice(0, row.split('.').length - 1).join('\n')
  // const textEng = row.split(',').map((text, index) => (index !== row.split(',').length - 1) ? `${text.trim()},` : text.trim()).join('\n')
  // const textStory = `${textEngJoin}\n+ ${textRow.text}\n\n`
  const textStory = `${textEngJoin}\n* **${textRow.text}**\n\n`
  const textMessage = `\`\`\`diff
${textEngJoin}
+ ${textRow.text}
\`\`\`\n`

  // console.log(textMessage)
  // console.log(chalk.green(textRow.text))
  // console.log(row.search(`“`))
  return row.search(`“`) === 0 || row.search(/(\()/g) === 0 || row.search('「') === 0 || row.search(/(\[)/g) === 0 ? textMessage : textStory
}

const runFunction = async (pathFile, pwd) => {
  const dataMap = readFileToArray(pathFile)
  let fullText = ''
  console.log('')
  console.log(chalk.blue(`Transalating ... ${pathFile}`))
  console.log('')
  await asyncForEach(dataMap, async (row, index) => {
    fullText += await renderRow(row)
    if(index === dataMap.length - 1){
      // console.log(fullText)
      fileTransalate(pathFile, fullText, pwd)
    }
  })
}

exports.runFunction = runFunction

