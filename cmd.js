const chalk = require('chalk')
const translate = require('google-translate-api')
const Progress = require('cli-progress');
const fileTransalate = require('./src/commands/transalate')
const { asyncForEach, readFileToArray } = require('./src/utils')

const renderRow = async (row) => {
  const textRow = await translate(row, { from: 'en', to: 'th'})
  const textEng = row.split('.').map((text, index) => (index !== row.split('.').length - 1) ? `${text.trim()}.` : text.trim() )
  const textEngJoin = textEng.length <= 2 ? textEng.join('\n') : textEng.slice(0, row.split('.').length).join('\n')
  const textStory = `${textEngJoin}\n* **${textRow.text}**\n\n`
  const textMessage = `\`\`\`diff
${textEngJoin}
+ ${textRow.text}
\`\`\`\n`
  return row.search(`“`) === 0 || row.search(/(\()/g) === 0 || row.search('「') === 0 || row.search(/(\[)/g) === 0 ? textMessage : textStory
}

const runFunction = async (pathFile, pwd) => {
  const dataMap = readFileToArray(pathFile)
  let fullText = ''
  console.log('')
  console.log(chalk.blue(`Transalating ... ${pathFile}`))
  console.log('')
  // create a new progress bar instance and use shades_classic theme
  var bar1 = new Progress.Bar({}, Progress.Presets.shades_grey)
  // start the progress bar with a total value of 200 and start value of 0
  bar1.start(dataMap.length, 0)
  await asyncForEach(dataMap, async (row, index) => {
    fullText += await renderRow(row)
    bar1.update(index + 1)
    if(index === dataMap.length - 1){
      bar1.stop()
      fileTransalate(pathFile, fullText, pwd)
    }
  })
}

exports.runFunction = runFunction

