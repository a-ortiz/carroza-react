import { Component } from 'react';

class GoogleMapPolyline extends Component {
  componentDidMount() {
    const google = window.google;
    const polyline = new google.maps.Polyline({
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: this.props.map
    });
    const path = polyline.getPath();
    this.props.points.forEach(({ lat, lng }) => {
      path.push(new google.maps.LatLng({ lat, lng }));
    });
    this.polyline = polyline;
  }

  componentWillUnmount() {
    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = null;
    }
  }

  render() {
    return null;
  }
}

export default GoogleMapPolyline;
