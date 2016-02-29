var fs = require('fs');
var JSONStream = require('JSONStream');
var eventStream = require('event-stream');
var colors = require('colors/safe');
var locationTransformStream = require('./locationTransformStream');
var moment = require('moment');

var stays = 0;
var locations = 0;
var lastStay,currentStay;
var locationHistoryFile = process.argv[2];
var year = process.argv[3];
var month = process.argv[4];
// Less than 1h not considered
var minimumStay = 1000 * 60 * 60;
var header = 'Email,Client,Project,Description,Start date,Start time,duration\n';
var prefix = 'thomas.haukland@gmail.com,Skagenfondene,CIP,CIP,';

fs.createReadStream(locationHistoryFile)
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
    if (stays === 0 ) {
      this.push(header);
    }
    stays++;
    // Expand stays with year/month/day
    var m = new Date(parseInt(stay.from));
    stay.year = m.getFullYear();
    stay.date = m.getDate();
    stay.month = m.getMonth();
    var startHour = m.getHours();
    var startMinutes = m.getMinutes();
    var startTime = moment(m).format('HH:mm:ss');
    //console.log("argYear: " + year);
    //console.log("argMonth: " + month);
    //console.log(startHour);
    //console.log(stay.year);
    //console.log(stay.month);
    if (stay.year == year && stay.month == month && startHour > 6 && startHour < 17) {
      var diff = moment(parseInt(stay.to)).diff(moment(parseInt(stay.from)));
      if (diff > minimumStay) {
        stay.duration = moment.utc(diff).format('HH:mm:ss');
        //console.log(stay.duration);
        // Convert to normal stream(chunk it)
        //this.push(JSON.stringify(stay) + ',\n');
        this.push(prefix + moment(m).format('YYYY-MM-DD') + ',' + startTime + ',' + stay.duration + '\n');
      }
    }
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
