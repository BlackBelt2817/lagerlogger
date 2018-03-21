import React, { Component } from 'react';

class BeerName extends Component {
  render() {
    return (
      <div>
        <h1 style={{fontSize: 40}}><u>{this.props.name} - {this.props.perc}%</u></h1>
      </div>
    );
  }
}

export default BeerName;