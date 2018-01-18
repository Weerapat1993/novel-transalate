const Progress = require('cli-progress');
 
// create a new progress bar instance and use shades_classic theme
var bar1 = new Progress.Bar({}, Progress.Presets.shades_classic);
 
// start the progress bar with a total value of 200 and start value of 0
bar1.start(200, 0);
 
// update the current value in your application..

for(let i = 0; i < 20; i++) {
  console.log(i)
  bar1.update(i * 10);
}

bar1.stop()