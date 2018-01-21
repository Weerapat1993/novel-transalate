const shell = require('shelljs')
const cmd = require('node-cmd')
const { path, asyncForEach } = require('./src/utils')
const { runFunction } = require('./cmd')

const folderName = 'my-daugther'

cmd.get('pwd', (err, data, stderr) => {
  const pwd = data.replace(new RegExp('\n','g'), '')
  const ls = shell.ls(path(`/data/${folderName}`))
  console.log('-----------------------------') 
  asyncForEach(ls, async (fileName) => {
    const pathFile = `/data/${folderName}/${fileName}`
    // console.log(path(pathFile))
    await runFunction(pathFile, pwd, true)
  })
})