import React from 'react';
import { connect } from 'react-redux';

import GoogleMap from './GoogleMap';
import GoogleMapMarker from './GoogleMapMarker';
import GoogleMapPolyline from './GoogleMapPolyline';

import './DeliveriesMap.css';

const DeliveriesMap = ({ selectedDelivery, onDeliveryMarkerClick }) => (
  <section className="DeliveriesMap">
    <GoogleMap center={{lat: 40.746421, lng: -73.988396}} zoom={12}>
      {map => {
        return (
          selectedDelivery ?
            <div>
              <GoogleMapMarker key={selectedDelivery.pickup.id} position={{ lat: selectedDelivery.pickup.location.latitude, lng: selectedDelivery.pickup.location.longitude }} label="P" title={`Delivery ${selectedDelivery.id} - pickup`} icon={{
                path: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
                fillColor: 'hsl(210, 29%, 28.7%)',
                fillOpacity: 0.8,
              }} map={map} onClick={onDeliveryMarkerClick} />
              <GoogleMapMarker key={selectedDelivery.dropoff.id} position={{ lat: selectedDelivery.dropoff.location.latitude, lng: selectedDelivery.dropoff.location.longitude }} label="D" title={`Delivery ${selectedDelivery.id} - dropoff`} icon={{
                path: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16.125c-3.383 0-6.125-2.742-6.125-6.125s2.742-6.125 6.125-6.125 6.125 2.742 6.125 6.125-2.742 6.125-6.125 6.125zM12.125 10c0-2.14 1.735-3.875 3.875-3.875s3.875 1.735 3.875 3.875c0 2.14-1.735 3.875-3.875 3.875s-3.875-1.735-3.875-3.875z',
                fillColor: 'hsl(48, 100%, 50.5%)',
                fillOpacity: 0.8,
              }} map={map} onClick={onDeliveryMarkerClick} />
              {selectedDelivery.tour &&
                <GoogleMapPolyline points={selectedDelivery.tour.points.map(({ latitude: lat, longitude: lng }) => {
                  return { lat, lng };
                })} map={map} />}
            </div> :
              null
        );
      }}
    </GoogleMap>
  </section>
);

export default connect(
  state => {
    const selectedDeliveryId = state.get('ui').get('selectedDeliveryId');
    let selectedDelivery = state.get('entities').get('deliveries').get(selectedDeliveryId);
    if (selectedDelivery) {
      const stops = state.get('entities').get('stops');
      selectedDelivery = selectedDelivery
      .set('pickup', stops.get(selectedDelivery.get('pickupStopId')))
      .set('dropoff', stops.get(selectedDelivery.get('dropoffStopId'))).toJS();
    }
    return {
      selectedDelivery
    }
  }
)(DeliveriesMap);
