import React, { Component } from 'react';

class BeerImage extends Component {
  render() {
    return (
      <div>
        <img alt={this.props.alt} id="beerpic" src={this.props.src} />
      </div>
    );
  }
}

export default BeerImage;