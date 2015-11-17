var geolib = require('geolib');
var eventStream = require('event-stream');

var currentLocation = null;
var prevLocation = null;
var onTheMove = false;
var newStay, distance, ms;

// Calculate every stay at one location(within a 200m radius)
// that lasted for more than 10 minutes

// The input stream should consist of google location history points
exports.createStream = () => {
  return eventStream.map((data, callback) => {
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
  });
}
