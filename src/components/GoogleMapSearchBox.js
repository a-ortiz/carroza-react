import React, { Component } from 'react';
import './GoogleMapSearchBox.css';

class GoogleMapSearchBox extends Component {
  static defaultProps = {
    placeholder: ''
  }

  componentDidMount() {
    this.input = new google.maps.places.SearchBox(this.inputRef, {
      bounds: this.props.bounds
    });

    this.placeChangedListener = this.input.addListener('places_changed', () => {
      if (this.props.onPlaceChanged) {
        const places = this.input.getPlaces();
        if (!places.length) return this.props.onPlaceChanged(null);

        const { geometry, formatted_address } = places[0];
        if (!geometry) return this.props.onPlaceChanged(null);

        const { location: { lat, lng } } = geometry;
        this.props.onPlaceChanged({
          address: formatted_address,
          location: {
            lat: lat(),
            lng: lng()
          }
        });
      }
    });
  }

  componentWillReceiveProps({ bounds: { east, north, south, west } }) {
    const { bounds } = this.props;
    if (!this.input) return;
    if (bounds.east === east && bounds.north === north && bounds.south === south && bounds.west === west) return;
    this.input.setBounds({ east, north, south, west });
  }

  componentWillUnmount() {
    if (this.placeChangedListener) {
      this.placeChangedListener.remove();
      this.placeChangedListener = null;
    }
    this.input = null;
  }

  render() {
    return (
      <input className="GoogleMapSearchBox" ref={ref => {
        this.inputRef = ref;
      }} placeholder={this.props.placeholder}/>
    );
  }
}

export default GoogleMapSearchBox;
