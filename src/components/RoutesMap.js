import React from 'react';
import { connect } from 'react-redux';

import GoogleMap from './GoogleMap';
import GoogleMapMarker from './GoogleMapMarker';
import GoogleMapPolyline from './GoogleMapPolyline';

import './RoutesMap.css';

const RoutesMap = ({ selectedRoute, onRouteMarkerClick }) => (
  <section className="RoutesMap">
    <GoogleMap center={{lat: 40.746421, lng: -73.988396}} zoom={12}>
      {map => {
        return (
          selectedRoute ?
            <div>
              {selectedRoute.stops.map((stop, index) => {
                return (
                  <GoogleMapMarker key={stop.id} position={{ lat: stop.location.latitude, lng: stop.location.longitude }} label={String(index + 1)} icon={{
                    path: 'M32 18l-4-8h-6v-4c0-1.1-0.9-2-2-2h-18c-1.1 0-2 0.9-2 2v16l2 2h2.536c-0.341 0.588-0.536 1.271-0.536 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.536-2h11.073c-0.341 0.588-0.537 1.271-0.537 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.537-2h2.537v-6zM22 18v-6h4.146l3 6h-7.146z',
                    fillColor: 'hsl(168, 75.4%, 42.2%)',
                    fillOpacity: 0.8,
                  }} map={map} onClick={onRouteMarkerClick} />
                );
              })}
              <GoogleMapMarker key={selectedRoute.driver.id} position={{ lat: selectedRoute.driver.location.latitude, lng: selectedRoute.driver.location.longitude }} title={selectedRoute.driver.name} icon={{
                path: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16.125c-3.383 0-6.125-2.742-6.125-6.125s2.742-6.125 6.125-6.125 6.125 2.742 6.125 6.125-2.742 6.125-6.125 6.125zM12.125 10c0-2.14 1.735-3.875 3.875-3.875s3.875 1.735 3.875 3.875c0 2.14-1.735 3.875-3.875 3.875s-3.875-1.735-3.875-3.875z',
                fillColor: 'hsl(48, 100%, 50.5%)',
                fillOpacity: 0.8,
              }} map={map} onClick={onRouteMarkerClick} />
              {selectedRoute.tour &&
                <GoogleMapPolyline points={[selectedRoute.driver.location, ...selectedRoute.tour.points].map(({ latitude: lat, longitude: lng }) => {
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
    const selectedRouteId = state.get('ui').get('selectedRouteId');
    let selectedRoute = state.get('entities').get('routes').get(selectedRouteId);
    if (selectedRoute) {
      const stops = state.get('entities').get('stops');
      const drivers = state.get('entities').get('drivers');
      selectedRoute = selectedRoute
      .set('driver', drivers.get(selectedRoute.get('driverId')))
      .set('stops', selectedRoute.get('stopIds').map(stopId => {
        return stops.get(stopId);
      })).toJS();
    }
    return {
      selectedRoute
    }
  }
)(RoutesMap);
