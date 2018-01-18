const shell = require('shelljs')
const cmd = require('node-cmd')
const { path, asyncForEach } = require('./src/utils')
const { runFunction } = require('./cmd')

cmd.get('pwd', (err, data, stderr) => {
  const pwd = data.replace(new RegExp('\n','g'), '')
  const ls = shell.ls(path('/data/i-said-make-my-abilities-average'))
  console.log('-----------------------------') 
  asyncForEach(ls, async (fileName) => {
    const pathFile = `/data/i-said-make-my-abilities-average/${fileName}`
    // console.log(path(pathFile))
    await runFunction(pathFile, pwd)
  })
})