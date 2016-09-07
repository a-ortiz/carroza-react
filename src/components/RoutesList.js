import React from 'react';
import { connect } from 'react-redux';
import { selectRouteAndLoadTourIfNeeded } from './../actions';

import Subheader from 'material-ui/Subheader';
import { List, ListItem, MakeSelectable } from 'material-ui/List';

import './RoutesList.css';

const SelectableList = new MakeSelectable(List);

const RoutesList = ({ routes, selectRouteAndLoadTourIfNeeded }) => (
  <SelectableList className="RoutesList">
    <Subheader>Routes</Subheader>
    {routes.map(({ id, driver, deliveryIds }) => (
      <ListItem
        key={id}
        primaryText={`Driver id: ${driver.name}`}
        secondaryText={`Deliveries: ${deliveryIds.join(', ')}`}
        secondaryTextLines={2}
        onTouchTap={() => selectRouteAndLoadTourIfNeeded(id)}
      />
    ))}
  </SelectableList>
);

export default connect(
  state => {
    const drivers = state.get('entities').get('drivers');
    // const deliveries = state.get('entities').get('deliveries');
    // const stops = state.get('entities').get('stops');
    // const selectedRouteId = state.get('ui').get('selectedRouteId');
    // const selectedRoute = state.get('entities').get('routes').get(selectedRouteId);

    return {
      routes: state.get('entities').get('routes').valueSeq().map(route => {
        return route
        .set('driver', drivers.get(route.get('driverId')))
      }).toJS()
    }
  },
  dispatch => {
    return {
      selectRouteAndLoadTourIfNeeded(id) {
        dispatch(selectRouteAndLoadTourIfNeeded(id));
      }
    }
  }
)(RoutesList);
