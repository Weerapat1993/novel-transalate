const colors = require('colors')

const PROGRESS_BAR_CONFIG = {
  format: colors.grey(' {bar}') + ' {percentage}% | lines: [{value}/{total}]',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591'
}

exports.PROGRESS_BAR_CONFIG = PROGRESS_BAR_CONFIG


