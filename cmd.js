const chalk = require('chalk')
const translate = require('google-translate-api')
const Progress = require('cli-progress')
const { PROGRESS_BAR_CONFIG } = require('./src/config/progress-bar')
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
  console.log(chalk.blue(`Transalating ... ./src${pathFile}`))
  // create a new progress bar instance and use shades_classic theme
  var progressBar = new Progress.Bar({}, PROGRESS_BAR_CONFIG)
  // start the progress bar with a total value of 200 and start value of 0
  progressBar.start(dataMap.length, 0)
  await asyncForEach(dataMap, async (row, index) => {
    fullText += await renderRow(row)
    progressBar.update(index + 1)
    if(index === dataMap.length - 1){
      progressBar.stop()
      fileTransalate(pathFile, fullText, pwd)
    }
  })
}

exports.runFunction = runFunction

