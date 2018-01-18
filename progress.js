const Progress = require('cli-progress')
var _colors = require('colors')
 
// create a new progress bar instance and use shades_classic theme
var bar1 = new Progress.Bar({}, {
  format: _colors.grey(' {bar}') + ' {percentage}% | time: {eta}s | {value}/{total}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591'
});
 
// start the progress bar with a total value of 200 and start value of 0
bar1.start(200, 0);
 
// update the current value in your application..

for(let i = 0; i < 20; i++) {
  console.log(i)
  bar1.update(i * 10);
}

bar1.stop()