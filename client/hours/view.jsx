import React, { Component, PropTypes } from 'react';
import Header from './header.jsx';
import DaysPanel from './hours.jsx';
import Map from './map.jsx';

export default class View extends Component {
  render() {
    return (
      <div>
        <Header/>
        <DaysPanel days={this.props.days}/>
        <Map locations={this.props.locations}/>
      </div>
    );
  }
}
