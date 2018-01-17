const fs = require('fs-extra')
const Log = require('./Log')
const srcPath = (pathName, pwd) => `${pwd}/src${pathName}`
// const templatePath = (pathName, pwd) => `/usr/local/lib/node_modules/react-cmd/app/templates${pathName}`

class MakeFile extends Log {
  constructor(cmd, env, pwd) {
    super()
    this.cmd = cmd
    this.env = env || null
    this.pwd = pwd
  }

  createDirectory(pathName, hideLog) {
    const dir = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
      if(!hideLog) {
        this.success(`create directory ./src${pathName}`)
      }
    }
    return this
  } 
  

  createFile(pathName, text, isRewrite) {
    const dir = srcPath(pathName, this.pwd)
    if(!isRewrite) {
      if (!fs.existsSync(dir)) {
        fs.writeFileSync(dir, text)
        this.success(`create file ./src${pathName} success.`)
      } else {
        this.error(`file ./src${pathName} is exists.`)
      }
    } else {
      if (!fs.existsSync(dir)) {
        fs.writeFileSync(dir, text)
        this.success(`create file ./src${pathName} success.`)
      } else {
        fs.writeFileSync(dir, text)
        this.success(`rewrite file ./src${pathName} success.`)
      }
    }
    return this
  }
}

module.exports = MakeFile
