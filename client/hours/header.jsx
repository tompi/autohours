import ReactDOM from 'react-dom';
import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <br/>
        <div className="col-xs-12">
          <div className="well">
            <h1>
              <div className="row">
              <div className="col-sm-9 col-xs-12">
                Auto Hours<br/>
                <small>No more guessing how long you worked</small>
              </div>
              <div className="col-xs-3">
                <div>
                  <select className="form-control">
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                  </select>
                </div>
                <div>
                  <select className="form-control">
                    <option value="0">Jan</option>
                    <option value="1">Feb</option>
                    <option value="2">Mar</option>
                    <option value="3">Apr</option>
                    <option value="4">May</option>
                    <option value="5">Jun</option>
                    <option value="6">Jul</option>
                    <option value="7">Aug</option>
                    <option value="8">Sep</option>
                    <option value="9">Oct</option>
                    <option value="10">Nov</option>
                    <option value="11">Dec</option>
                  </select>
                </div>
              </div>
            </div>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
