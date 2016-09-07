import { Component } from 'react';

const geocoder = new google.maps.Geocoder();

class GoogleMapMarker extends Component {
  componentDidMount() {
    const map = this.props.map;
    const google = window.google;
    const marker = new google.maps.Marker({
      position: this.props.position,
      map: map,
      label: this.props.label || '',
      title: this.props.title || '',
      icon: this.props.icon || undefined
    });

    const infoWindow = new google.maps.InfoWindow();

    this.clickListener = marker.addListener('click', event => {
      if(this.props.onClick) {
        this.props.onClick(this.props.meta || {});
      }

      geocoder.geocode({'location': this.props.position}, function (results, status) {
        if (status === 'OK') {
          if (results[1]) {
            const address = results[1].formatted_address;
            infoWindow.setContent(address);
            infoWindow.open(map, marker);
          } else {
            cb(new Error('No results found'));
          }
        } else {
          cb(new Error(`Geocoder failed due to: ${status}`));
        }
      });
    });

    this.marker = marker;
    this.infoWindow = infoWindow;
  }

  componentWillUnmount() {
    this.clickListener.remove();
    this.clickListener = null;

    this.infoWindow.close();
    this.infoWindow = null;

    this.marker.setMap(null);
    this.marker = null;
  }

  render() {
    return null;
  }
}

export default GoogleMapMarker;
