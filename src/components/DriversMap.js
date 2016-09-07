import React from 'react';
import { connect } from 'react-redux';

import GoogleMap from './GoogleMap';
import GoogleMapMarker from './GoogleMapMarker';

import './DriversMap.css';

const DriversMap = ({ selectedDriver, onDriverMarkerClick }) => (
  <section className="DriversMap">
    <GoogleMap center={{lat: 40.746421, lng: -73.988396}} zoom={12}>
      {map => {
        return (
          selectedDriver ?
            <GoogleMapMarker key={selectedDriver.id} position={{ lat: selectedDriver.location.latitude, lng: selectedDriver.location.longitude }} title={selectedDriver.name} icon={{
              path: 'M32 18l-4-8h-6v-4c0-1.1-0.9-2-2-2h-18c-1.1 0-2 0.9-2 2v16l2 2h2.536c-0.341 0.588-0.536 1.271-0.536 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.536-2h11.073c-0.341 0.588-0.537 1.271-0.537 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.537-2h2.537v-6zM22 18v-6h4.146l3 6h-7.146z',
              fillColor: 'hsl(168, 75.4%, 42.2%)',
              fillOpacity: 0.8,
            }} map={map} onClick={onDriverMarkerClick} /> :
              null
        );
      }}
    </GoogleMap>
  </section>
);

export default connect(
  state => {
    const selectedDriverId = state.get('ui').get('selectedDriverId');
    return {
      selectedDriver: selectedDriverId ? state.get('entities').get('drivers').get(selectedDriverId).toJS() : null
    }
  }
)(DriversMap);
