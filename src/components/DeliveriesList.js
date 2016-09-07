import React from 'react';
import { connect } from 'react-redux';
import { selectDeliveryAndLoadTourIfNeeded } from './../actions';

import Subheader from 'material-ui/Subheader';
import { List, ListItem, MakeSelectable } from 'material-ui/List';

import './DeliveriesList.css';

const SelectableList = new MakeSelectable(List);

const DeliveriesList = ({ deliveries, selectDeliveryAndLoadTourIfNeeded }) => (
  <SelectableList className="DeliveriesList">
    <Subheader>Deliveries</Subheader>
    {deliveries.map(({ id, pickup, dropoff }) => (
      <ListItem
        key={id}
        primaryText={`Delivery id: ${id}`}
        onTouchTap={() => selectDeliveryAndLoadTourIfNeeded(id)}
      />
    ))}
  </SelectableList>
);

export default connect(
  state => {
    const stops = state.get('entities').get('stops');
    return {
      deliveries: state.get('entities').get('deliveries').valueSeq().map(delivery => {
        return delivery
        .set('pickup', stops.get(delivery.get('pickupStopId')))
        .set('dropoff', stops.get(delivery.get('dropoffStopId')));
      }).toJS()
    }
  },
  dispatch => {
    return {
      selectDeliveryAndLoadTourIfNeeded(id) {
        dispatch(selectDeliveryAndLoadTourIfNeeded(id));
      }
    }
  }
)(DeliveriesList);
