const chalk = require('chalk')
const translate = require('google-translate-api')
const Progress = require('cli-progress')
const { PROGRESS_BAR_CONFIG } = require('./src/config/progress-bar')
const fileTransalate = require('./src/commands/transalate')
const { asyncForEach, readFileToArray } = require('./src/utils')

/**
 * Render Text Row
 * @param {string} row 
 * @param {number} index 
 * @param {boolean} isTransalate
 * @return {string}
 */
const renderRow = async (row, index, isTransalate) => {
  if(!index) {
    const textHeader = `# ${row}\n`
    return textHeader
  }
  let textRow = ''
  if(isTransalate) {
    textRow = await translate(row, { from: 'en', to: 'th'})
  }
  const textEng = row.split('.').map((text, index) => (index !== row.split('.').length - 1) ? `${text.trim()}.` : text.trim() )
  const textEngJoin = textEng.length <= 2 ? textEng.join('\n') : textEng.slice(0, row.split('.').length).join('\n')
  const textStory = isTransalate ? `${textEngJoin}\n* **${textRow.text}**\n\n` : `${textEngJoin}\n`
  const textMessage = isTransalate ? `\`\`\`diff
${textEngJoin}
+ ${textRow.text}
\`\`\`\n` : `\`\`\`diff
${textEngJoin}
\`\`\`\n`

  return row.search(`“`) === 0 || row.search(/(\()/g) === 0 || row.search('「') === 0 || row.search(/(\[)/g) === 0 ? textMessage : textStory
}

const runFunction = async (pathFile, pwd, isTransalate = true) => {
  const dataMap = readFileToArray(pathFile)
  let fullText = ''
  console.log('')
  console.log(chalk.blue(`Transalating ... ./src${pathFile}`))
  // create a new progress bar instance and use shades_classic theme
  var progressBar = new Progress.Bar({}, PROGRESS_BAR_CONFIG)
  // start the progress bar with a total value of 200 and start value of 0
  progressBar.start(dataMap.length, 0)
  await asyncForEach(dataMap, async (row, index) => {
    fullText += await renderRow(row, index, isTransalate)
    progressBar.update(index + 1)
    if(index === dataMap.length - 1){
      progressBar.stop()
      fileTransalate(pathFile, fullText, pwd)
    }
  })
}

exports.runFunction = runFunction

