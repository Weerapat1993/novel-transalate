const { MakeFile } = require('../utils')

// Make Command
const Transalate = (path, env, pwd) => {
  const file = new MakeFile(null, env, pwd)
  const pathDocs = path.split(new RegExp('/', 'g')) 
  file
    .createDirectory('/docs')
    .createDirectory(`/docs/${pathDocs[2]}`)
    .createFile(`/docs/${pathDocs[2]}/${pathDocs[3].replace('.txt', '.md')}`,`
# Header
${env}
`, true)
}

module.exports = Transalate
