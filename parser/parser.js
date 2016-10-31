var fs = require('fs');
var JSONStream = require('JSONStream');
var eventStream = require('event-stream');
var colors = require('colors/safe');
var locationTransformStream = require('./locationTransformStream');
var moment = require('moment');
var input = require('./input')
var Promise = require('es6-promise').Promise;

var stays = 0;
var locations = 0;
var lastStay,currentStay,finished;

function onFinish() {
  if (!finished) {
    finished = true;
    console.log(colors.cyan('Number of locations: ' + colors.bold(locations)));
    console.log(colors.blue('Number of stays: ' + colors.bold(stays)));
    console.log(colors.green('First stay: ' + formatDate(currentStay)));
    console.log(colors.red('Last stay: ' + formatDate(lastStay)));
  }
}

var promise = new Promise((resolve, reject) => {
  input.getParameters(function(answers) {
    // Stays to ask user about
    var possibleStays = [];
    // Less than 10m not considered
    var minimumStay = 1000 * 60 * 5;
    // Calculate the first possible date to contain stays of interest
    var firstPossibleDate = new Date(answers.year, answers.month -1, 1);

    // Create input stream from user provided file
    var stream = fs.createReadStream(answers.infile);
    stream
      // Parse as json and only json under "locations"
      .pipe(JSONStream.parse('locations.*'))
      // Count number of locations
      .on('data', (data) => {
        locations++;
        //var m = new Date(parseInt(data.timestampMs));
        //console.log(m);
      })
      .pipe(locationTransformStream.createStream())
      .pipe(eventStream.through(function(stay) {
        stays++;
        // Get from as date
        var m = new Date(parseInt(stay.from));
        // Since location files start with newest first, we can abort if
        // this date is older than forstPossibleDate
        if (m < firstPossibleDate) {
          resolve({answers: answers, possibleStays: possibleStays});
          stream.unpipe();
          onFinish();
          return;
        }
        // Expand stays with year/month/day
        stay.year = m.getFullYear();
        stay.date = m.getDate();
        stay.month = m.getMonth();
        var startHour = m.getHours();
        var startMinutes = m.getMinutes();
        var startTime = moment(m).format('HH:mm:ss');
        //console.log(answers);
        //console.log(stay);
        if (stay.year == answers.year && stay.month == answers.month-1 && startHour > 6 && startHour < 17) {
          var diff = moment(parseInt(stay.to)).diff(moment(parseInt(stay.from)));
          if (diff > minimumStay) {
            stay.duration = moment.utc(diff).format('HH:mm:ss');
            stay.formattedStartTime = startTime;
            stay.formattedStartDate = moment(m).format('YYYY-MM-DD');
            possibleStays.push(stay);
          }
        }
        // Locations are in reverse order, last on top
        currentStay = stay;
        if (stays === 1) {
          lastStay = stay;
        }
      }));
  });
});

promise.then(( result ) => {
  confirmStays(result.answers, result.possibleStays);
});


function formatDate(stay) {
  return colors.bold(stay.year + '-' + (stay.month+1) + '-' + stay.date);
}

function confirmStays(answers, possibleStays) {
  var prefix = answers.email + ',' + answers.client + ',' +
               answers.project + ',' + answers.description + ',';

  var promises = [];
  var outputFileStream = fs.createWriteStream(answers.outfile);
  outputFileStream.once('open', function(fd) {
    outputFileStream.write('Email,Client,Project,Description,Start date,Start time,duration\n');

    possibleStays.forEach((stay) => {
      // Ask user
      outputFileStream.write(prefix + stay.formattedStartDate + ',' +
          stay.formattedStartTime + ',' + stay.duration + '\n');
    });
    outputFileStream.end();
  });

}
