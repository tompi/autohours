import ReactDOM from 'react-dom';
import React from 'react';
import L from 'leaflet';

export default class Map extends React.Component {
  render() {
    return (
      <div style={{height: '200px'}} id="map"></div>
    );
  }
  componentDidMount() {
    // Map stuff
    var map = L.map('map');
    var group = new L.featureGroup(
      this.props.locations.map(function(location) {
        return L.circle([location.lat, location.lon], 50, {
          color: location.color,
          fillColor: location.color,
          fillOpacity: 0.6
        }).addTo(map);
      })
    );
    map.fitBounds(group.getBounds());

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
          maxZoom: 18,
          //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          //  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          //  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
          id: 'mapbox.streets'
        }).addTo(map);
  }
}
