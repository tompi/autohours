var fs = require('fs');
var JSONStream = require('JSONStream');
var eventStream = require('event-stream');
var colors = require('colors/safe');
var locationTransformStream = require('./locationTransformStream');

var stays = 0;
var locations = 0;
var lastStay,currentStay;

fs.createReadStream('LocationHistory.json')
  .pipe(JSONStream.parse('locations.*'))
  .on('data', () => { locations++; })
  .on('end', () => {
    console.log(colors.cyan('Number of locations: ' + colors.bold(locations)));
    console.log(colors.blue('Number of stays: ' + colors.bold(stays)));
    console.log(colors.green('First stay: ' + formatDate(currentStay)));
    console.log(colors.red('Last stay: ' + formatDate(lastStay)));
  })
  .pipe(locationTransformStream.createStream())
  .pipe(eventStream.through(function(stay) {
    stays++;
    // Expand stays with year/month/day
    var m = new Date(parseInt(stay.from));
    stay.year = m.getFullYear();
    stay.date = m.getDate();
    stay.month = m.getMonth();
    // Convert to normal stream(chunk it)
    this.push(JSON.stringify(stay) + ',\n');
    // Locations are in reverse order, last on top
    currentStay = stay;
    if (stays === 1) {
      lastStay = stay;
    }
  }))
  // Write to file
  .pipe(fs.createWriteStream('stays.json', { flags: 'w' }));

function formatDate(stay) {
  return colors.bold(stay.year + '-' + (stay.month+1) + '-' + stay.date);
}
