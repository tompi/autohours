import ReactDOM from 'react-dom';
import React from 'react';

class Bar extends React.Component {
  render() {
    var divStyle = {
      width: this.props.interval.percent + '%',
      backgroundColor: this.props.interval.color
    };
    return (
      <div className="progress-bar" style={divStyle}>
        {this.props.interval.text}
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    return (
      <div className="progress">
        {
          this.props.locations.map((interval, ix) => {
            return <Bar interval={interval} key={ix}/>
          })
        }
      </div>
    );
  }
}

export default class DayPanel extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          {
            this.props.days.map(day => {
                return (
                  <div className="row" key={day.name}>
                    <div className="col-xs-1">{day.name}</div>
                    <div className="col-xs-11">
                      <Day locations={day.locations}/>
                    </div>
                  </div>
                );
            })
          }
        </div>
      </div>
    );
  }
}
