import React from 'react';
import { connect } from 'react-redux';
import { selectDriver } from './../actions';

import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';

import './DriversList.css';

const DriversList = ({ drivers, selectDriver }) => (
  <List className="DriversList">
    <Subheader>Drivers</Subheader>
    {drivers.map(({ id, name, location: { latitude, longitude } }) => (
      <ListItem
        key={id}
        primaryText={name}
        secondaryText={
          <p>
            <span>Vehicle id: {id}</span> --
            Around coordinates {latitude}, {longitude}.
          </p>
        }
        secondaryTextLines={2}
        onTouchTap={() => selectDriver(id)}
      />
    ))}
  </List>
);

export default connect(
  state => {
    return {
      drivers: state.get('entities').get('drivers').valueSeq().toJS()
    }
  },
  dispatch => {
    return {
      selectDriver(id) {
        dispatch(selectDriver(id));
      }
    }
  }
)(DriversList);
