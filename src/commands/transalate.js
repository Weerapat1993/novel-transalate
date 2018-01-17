const { MakeFile } = require('../utils')

// Make Command
const Transslate = (cmd, env, pwd) => {
  const file = new MakeFile(cmd, env, pwd)
  
  file
    .createDirectory('/docs')
    .createFile('/docs/test.md', `
# Header
\`\`\`diff
${env}
\`\`\`
`, true)
}

module.exports = Transslate
