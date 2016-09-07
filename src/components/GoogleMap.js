import React, { Component } from 'react';

class GoogleMap extends Component {
  componentDidMount() {
    const map = new window.google.maps.Map(this.mapRef, {
      center: this.props.center,
      zoom: this.props.zoom
    });

    this.clickListener = map.addListener('click', event => {
      if (this.props.onClick) {
        const { latLng: { lat, lng } } = event;
        this.props.onClick({ lat: lat(), lng: lng() });
      }
    });

    this.boundsChangedListener = map.addListener('idle', () => {
      if (this.props.onBoundsChanged) {
        const { b: { b: west, f: east }, f: { b: north, f: south } } = map.getBounds();
        this.props.onBoundsChanged({ east, north, south, west });
      }
    });

    this.map = map;
    this.forceUpdate();
  }

  componentWillUnmount() {
    if (this.clickListener) {
        this.clickListener.remove();
        this.clickListener = null;
    }
    if (this.boundsChangedListener) {
        this.boundsChangedListener.remove();
        this.boundsChangedListener = null;
    }
    this.map = null;
  }

  render() {
    return (
      <div style={{height: '100%', width: '100%'}} ref={ref => {
        this.mapRef = ref
      }}>
        {this.props.children && this.map && this.props.children(this.map)}
      </div>
    );
  }
}

export default GoogleMap;
