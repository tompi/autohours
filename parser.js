var fs = require('fs');
var JSONStream = require('JSONStream');
var moment = require('moment');
var eventStream = require('event-stream');
var geolib = require('geolib');
var colors = require('colors/safe');
var outFile = fs.createWriteStream('stays.json', { flags: 'w' });

var currentLocation = null;
var prevLocation = null;
var onTheMove = false;
var newStay, distance, ms;

fs.createReadStream('LocationHistory.json')
  .pipe(JSONStream.parse('locations.*'))
  .pipe(eventStream.map((data, callback) => {
    newStay = null;
    data.latitude = data.latitudeE7/10000000;
    data.longitude = data.longitudeE7/10000000;
    if (currentLocation) {
      distance = geolib.getDistance(prevLocation, data);
      if (distance > 200) {
        if (!onTheMove) {
          onTheMove = true;
          ms = currentLocation.timestampMs - prevLocation.timestampMs;
          // Dont count stays of less than 10 minutes
          if (ms > 600000) {
            newStay = {
              lat: currentLocation.latitude,
              lon: currentLocation.longitude,
              from: prevLocation.timestampMs,
              to: currentLocation.timestampMs
            };
          }
        }
      } else {
        if (onTheMove) {
          currentLocation = prevLocation;
          onTheMove = false;
        }
      }
    } else {
      // Initial marker
      currentLocation = data;
      onThemove = false;
    }
    prevLocation = data;
    if (newStay) 
      callback(null, newStay)
    else 
      callback();
  }))
  // Convert to normal stream(chunk it)
  .pipe(eventStream.through(function(data) {
    this.push(JSON.stringify(data) + ',\n');
  }))
  .pipe(outFile);
  //.pipe(process.stdout);


//            console.log(colors.red('To: ' + moment(parseInt(currentLocation.timestampMs)).format('YYYY.MM.DD HH:mm')));
